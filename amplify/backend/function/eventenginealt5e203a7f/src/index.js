const axios = require('axios')
let url = "https://ap-northeast-1.signin.aws.amazon.com/federation"

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {

    const q = event.queryStringParameters

    const session = JSON.parse(q['Session'])
    const sessionDuration = q['SessionDuration']

    const JsonSessionString = session
    const JsonSessionStringEncoded = encodeURIComponent(JSON.stringify(JsonSessionString))

    const path = 'Action=getSigninToken' +
        '&SessionDuration=' + sessionDuration +
        `&Session=${JsonSessionStringEncoded}`

    const { status, data } = await axios.get(`${url}?${path}`)

    return {
        statusCode: status,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "*"
        },
        body: JSON.stringify(data)
    }
};
