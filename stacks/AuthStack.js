import * as iam from "aws-cdk-lib/aws-iam";
import * as cognito from "aws-cdk-lib/aws-cognito";
import { Auth, use } from "@serverless-stack/resources";
import { StorageStack } from "./StorageStack";
import { ApiStack } from "./ApiStack";

export function AuthStack({ stack, app }) {
  const { bucket } = use(StorageStack);
  const { api } = use(ApiStack);

  const auth = new Auth(stack, "Auth", {
    login: ["email"],
    identityPoolFederation: {
      facebook: { appId: "589302102787090" },
      google: {
        clientId:
          "2444693731-bhvh42fmb7hg7gugflpcgauo5t6qgmnq.apps.googleusercontent.com",
      },
    },
    cdk: {
      userPoolClient: {
        supportedIdentityProviders: [
          cognito.UserPoolClientIdentityProvider.GOOGLE,
        ],
        oAuth: {
          callbackUrls: ["http://localhost:3000"],
          logoutUrls: ["http://localhost:3000"],
        },
      },
    },
  });

  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET)
    throw new Error("Please set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET");

  const provider = new cognito.UserPoolIdentityProviderGoogle(stack, "Google", {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    userPool: auth.cdk.userPool,
    scopes: ["profile", "email", "openid"],
    attributeMapping: {
      email: cognito.ProviderAttribute.GOOGLE_EMAIL,
      givenName: cognito.ProviderAttribute.GOOGLE_GIVEN_NAME,
      familyName: cognito.ProviderAttribute.GOOGLE_FAMILY_NAME,
      profilePicture: cognito.ProviderAttribute.GOOGLE_PICTURE,
    },
  });

  auth.cdk.userPoolClient.node.addDependency(provider);

  auth.attachPermissionsForAuthUsers([
    api,
    new iam.PolicyStatement({
      actions: ["s3:*"],
      effect: iam.Effect.ALLOW,
      resources: [
        bucket.bucketArn + "/private/${cognito-identity.amazonaws.com:sub}/*",
      ],
    }),
  ]);

  stack.addOutputs({
    Region: app.region,
    UserPoolId: auth.userPoolId,
    IdentityPoolId: auth.cognitoIdentityPoolId,
    UserPoolClientId: auth.userPoolClientId,
  });

  return {
    auth,
  };
}
