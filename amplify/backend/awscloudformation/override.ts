import { AmplifyRootStackTemplate } from '@aws-amplify/cli-extensibility-helper';

export function override(resources: AmplifyRootStackTemplate) {

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
                        Action: ["*"],
                        Effect: "Allow",
                    },
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

}
