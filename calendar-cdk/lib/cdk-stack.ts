import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

import * as events from 'aws-cdk-lib/aws-events';
import * as targets from 'aws-cdk-lib/aws-events-targets';
import * as iam from 'aws-cdk-lib/aws-iam';

export class CdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'CdkQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });

    const calendarName = "event-engine-alt-schedule"

    const targetRoleName = "amplify-eventenginealt-dev-12150-authRole"
    const targetPolicyArn = "arn:aws:iam::aws:policy/AdministratorAccess"

    // -----

    const accountId = cdk.Stack.of(this).account
    const region = cdk.Stack.of(this).region

    const tagetRole = iam.Role.fromRoleName(this, 'target-role', targetRoleName)

    const calendarArn = `arn:aws:ssm:${region}:${accountId}:document/${calendarName}`
    
    new events.Rule(this, 'schedule-open-rule', {
      eventPattern: {
        source: ["aws.ssm"],
        detailType: ["Calendar State Change"],
        "resources": [calendarArn],
        detail: {
          "state": ["OPEN"],
        }
      },
      targets: [
        new targets.AwsApi({
          service: 'IAM',
          action: 'attachRolePolicy',
          parameters: {
            "PolicyArn": targetPolicyArn,
            "RoleName": targetRoleName
          },
          policyStatement: new iam.PolicyStatement({
            effect: iam.Effect.ALLOW,
            actions: ['iam:*'],
            resources: [tagetRole.roleArn]
          }),

        })
      ]
    })

    new events.Rule(this, 'schedule-close-rule', {
      eventPattern: {
        source: ["aws.ssm"],
        detailType: ["Calendar State Change"],
        "resources": [calendarArn],
        detail: {
          "state": ["CLOSE"],
        }
      },
      targets: [
        new targets.AwsApi({
          service: 'IAM',
          action: 'detachRolePolicy',
          parameters: {
            "PolicyArn": targetPolicyArn,
            "RoleName": targetRoleName
          },
          policyStatement: new iam.PolicyStatement({
            effect: iam.Effect.ALLOW,
            actions: ['iam:*'],
            resources: [tagetRole.roleArn]
          }),

        })
      ]
    })

  }
}
