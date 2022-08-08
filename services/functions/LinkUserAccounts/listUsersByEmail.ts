import AWS from 'aws-sdk';

export const listUsersByEmail = async ({
  userPoolId,
  email,
}: {
  userPoolId: string;
  email: string;
}): Promise<AWS.CognitoIdentityServiceProvider.ListUsersResponse> => {
  const params = {
    UserPoolId: userPoolId,
    Filter: `email = "${email}"`,
  };

  const cognitoIdp = new AWS.CognitoIdentityServiceProvider();
  return cognitoIdp.listUsers(params).promise();
};
