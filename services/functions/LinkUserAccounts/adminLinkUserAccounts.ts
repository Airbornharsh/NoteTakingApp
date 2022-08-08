import AWS from "aws-sdk";

export const adminLinkUserAccounts = async ({
  username,
  userPoolId,
  providerName,
  providerUserId,
}: {
  username: string;
  userPoolId: string;
  providerName: string;
  providerUserId: string;
}): Promise<AWS.CognitoIdentityServiceProvider.AdminLinkProviderForUserResponse> => {
  const params = {
    DestinationUser: {
      ProviderAttributeValue: username,
      ProviderName: "Cognito",
    },
    SourceUser: {
      ProviderAttributeName: "Cognito_Subject",
      ProviderAttributeValue: providerUserId,
      ProviderName: providerName,
    },
    UserPoolId: userPoolId,
  };

  const cognitoIdp = new AWS.CognitoIdentityServiceProvider();
  return new Promise((resolve, reject) => {
    cognitoIdp.adminLinkProviderForUser(params, (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(data);
    });
  });
};
