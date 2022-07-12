import * as iam from "aws-cdk-lib/aws-iam";
import { Auth, use } from "@serverless-stack/resources";
import { StorageStack } from "./StorageStack";
import { ApiStack } from "./ApiStack";

export function AuthStack({ stack, app }) {
  const { bucket } = use(StorageStack);
  const { api } = use(ApiStack);

  const auth = new Auth(stack, "Auth", {
    login: ["email"],
  });
    
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
