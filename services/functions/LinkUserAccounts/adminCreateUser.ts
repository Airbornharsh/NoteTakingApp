import AWS from 'aws-sdk';

export const adminCreateUser = async ({
  userPoolId,
  email,
  givenName,
  familyName,
}: {
  userPoolId: string;
  email: string;
  givenName: string;
  familyName: string;
}): Promise<AWS.CognitoIdentityServiceProvider.AdminCreateUserResponse> => {
  const params = {
    UserPoolId: userPoolId,
    // SUPRESS prevents sending an email with the temporary password
    // to the user on account creation
    MessageAction: 'SUPPRESS',
    Username: email,
    UserAttributes: [
      {
        Name: 'given_name',
        Value: givenName,
      },
      // {
      //   Name: 'family_name',
      //   Value: familyName,
      // },
      {
        Name: 'email',
        Value: email,
      },
      {
        Name: 'email_verified',
        Value: 'true',
      },
    ],
  };

  const cognitoIdp = new AWS.CognitoIdentityServiceProvider();
  return cognitoIdp.adminCreateUser(params).promise();
};
