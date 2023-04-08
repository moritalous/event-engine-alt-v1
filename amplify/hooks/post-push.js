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

const { custom, providers, auth } = amplifyMetaFile;
// Change the name of resourceName below to your Amplify-created resource name if different
const { customResource2b758e7dcloudwatchrum } = custom;
const { eventenginealtbcc6920b } = auth;

console.log('Copy/paste these values in public/index.html with CloudWatch RUM code snippet below');

console.log(`appMonitorId ${customResource2b758e7dcloudwatchrum.output.AppMonitorId}`);
console.log(`awsRegion ${providers.awscloudformation.Region}`);

console.log('Copy/paste these values in amplify/backend/function/eventenginealt0da88be7/src/index.js as userPoolId');

console.log(`userPoolId ${eventenginealtbcc6920b.output.UserPoolId}`);
