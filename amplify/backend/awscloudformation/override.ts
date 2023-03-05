import { AmplifyRootStackTemplate } from '@aws-amplify/cli-extensibility-helper';

export function override(resources: AmplifyRootStackTemplate) {

    const awsRegion = '*'
    const awsAccountId = '*'
    const amplifyProjectName = 'eventenginealt'
    const amplifyEnv = 'dev'

    const putRumPolicy = {
        Effect: "Allow",
        Resource: `arn:aws:rum:${awsRegion}:${awsAccountId}:appmonitor/app-monitor-${amplifyProjectName}-${amplifyEnv}`,
        Action: ["rum:PutRumEvents"]
    }

    const authRole = resources.authRole;

    const basePolicies = Array.isArray(authRole.policies)
        ? authRole.policies
        : [authRole.policies];

    authRole.policies = [
        ...basePolicies,
        {
            policyName: "amplify-permissions-custom-resources",
            policyDocument: {
                Version: "2012-10-17",
                Statement: [
                    {
                        Resource: "*",
                        Action: ["ec2:Describe*", "ec2:Get*"],
                        Effect: "Allow",
                    },
                    putRumPolicy
                ],
            },
        },
    ];


    const baseManagedPolicy = Array.isArray(authRole.managedPolicyArns)
        ? authRole.managedPolicyArns
        : [authRole.managedPolicyArns];

    authRole.managedPolicyArns = [
        ...baseManagedPolicy,
        'arn:aws:iam::aws:policy/ReadOnlyAccess'
    ]


    // const unauthRole = resources.unauthRole;

    // const baseUnauthPolicies = Array.isArray(unauthRole.policies)
    //     ? unauthRole.policies
    //     : [unauthRole.policies];

    // unauthRole.policies = [
    //     ...baseUnauthPolicies,
    //     {
    //         policyName: "amplify-permissions-custom-resources-unauth",
    //         policyDocument: {
    //             Version: "2012-10-17",
    //             Statement: [
    //                 putRumPolicy
    //             ],
    //         },
    //     },
    // ];

}
