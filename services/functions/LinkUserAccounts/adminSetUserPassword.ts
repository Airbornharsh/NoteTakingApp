import AWS from 'aws-sdk';

export const adminSetUserPassword = async ({
  userPoolId,
  email,
}: {
  userPoolId: string;
  email: string;
}): Promise<AWS.CognitoIdentityServiceProvider.AdminSetUserPasswordResponse> => {
  const params = {
    Password: generatePassword(),
    UserPoolId: userPoolId,
    Username: email,
    Permanent: true,
  };

  const cognitoIdp = new AWS.CognitoIdentityServiceProvider();
  return cognitoIdp.adminSetUserPassword(params).promise();
};

function generatePassword() {
  return `${Math.random() // Generate random number, eg: 0.123456
    .toString(36) // Convert  to base-36 : "0.4fzyo82mvyr"
    .slice(-8)}42`; // Cut off last 8 characters : "yo82mvyr" and add a number because the cognito password policy requires a number
}
