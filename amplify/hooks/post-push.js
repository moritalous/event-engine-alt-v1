// https://aws.amazon.com/jp/blogs/mobile/implementing-real-user-monitoring-of-amplify-application-using-amazon-cloudwatch-rum/

const fs = require('fs');
const path = require('path');
const parameters = JSON.parse(fs.readFileSync(0, { encoding: 'utf8' }));

const amplifyMetaFile = JSON.parse(fs.readFileSync(path.join(
  parameters.data.amplify.environment.projectPath,
  'amplify',
  'backend',
  'amplify-meta.json'
)));

const { custom, providers } = amplifyMetaFile;
// Change the name of resourceName below to your Amplify-created resource name if different
const { customResource2b758e7dcloudwatchrum } = custom;

console.log('Copy/paste these values in public/index.html with CloudWatch RUM code snippet below');

console.log(`appMonitorId ${customResource2b758e7dcloudwatchrum.output.AppMonitorId}`);
console.log(`appMonitorGuestRoleArn ${customResource2b758e7dcloudwatchrum.output.GuestRoleArn}`);
console.log(`appMonitoridentityPoolId ${customResource2b758e7dcloudwatchrum.output.IdentityPoolId}`);
console.log(`awsRegion ${providers.awscloudformation.Region}`);
