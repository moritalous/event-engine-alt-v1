const { CloudTrail, CognitoIdentityServiceProvider } = require('aws-sdk');

const cloudtrail = new CloudTrail();
const cognitoIsp = new CognitoIdentityServiceProvider();

const userPoolId = 'xxxxxxxxxxxxxx'

function getEmail(attributes) {
  const ret = attributes.filter((x) => x.Name === 'email')[0]
  return ret.Value
}

function convertEvent(event) {

  let cloudTrailEvent = event.CloudTrailEvent
  cloudTrailEvent = JSON.parse(cloudTrailEvent)

  let sessionContext = cloudTrailEvent.userIdentity.sessionContext

  let amr = sessionContext.webIdFederationData.attributes[
    "cognito-identity.amazonaws.com:amr"
  ]
  try {
    amr = JSON.parse(amr)
    amr = amr.filter((x) => x.indexOf(':') > 0)
    amr = amr[0].split(':')
    amr = amr[amr.length - 1]
  } catch (e) {
    //
  }

  return {
    eventTime: cloudTrailEvent.eventTime,
    eventSource: cloudTrailEvent.eventSource,
    eventName: cloudTrailEvent.eventName,
    userName: amr
  }

}
/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);

  let trailEvents = await cloudtrail.lookupEvents({
    LookupAttributes: [
      {
        AttributeKey: 'Username',
        AttributeValue: 'CognitoIdentityCredentials'
      },
    ],
  }).promise()

  trailEvents = trailEvents.Events.map((x) => convertEvent(x))
  trailEvents = trailEvents.filter((x) => x.userName.length > 0)

  let cognitoUsers = await cognitoIsp.listUsers({
    UserPoolId: userPoolId
  }).promise()
  console.log(cognitoUsers)

  const users = {}
  cognitoUsers.Users.forEach(x => {
    users[[x.Username]] = getEmail(x.Attributes)
  })

  trailEvents = trailEvents.map((x) => { x['email'] = users[x.userName]; console.log(x); return x })

  return {
    statusCode: 200,
    //  Uncomment below to enable CORS requests
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*"
    },
    body: JSON.stringify(trailEvents),
  };
};
