import { Api, use } from "@serverless-stack/resources";
import { StorageStack } from "./StorageStack";
// import { AuthStack } from "./AuthStack";

export function ApiStack({ stack, app }) {
  const { table } = use(StorageStack);
  // const { auth } = use(AuthStack);

  const api = new Api(stack, "Api", {
    // defaults: {
    //   authorizer: {
    //     myAuthorizer: {
    //       type: "user_pool",
    //       userPool: {
    //         id: auth.userPoolId,
    //         clientIds: [auth.userPoolClientId],
    //       },
    //     },
    //   },
    //   defaults: {
    //     authorizer: "myAuthorizer",
    //   },
    // },
    defaults: {
      authorizer: "iam",
      function: {
        permissions: [table],
        environment: {
          TABLE_NAME: table.tableName,
          STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
        },
      },
    },

    routes: {
      "POST /notes": "functions/create.main",
      "GET /notes/{id}": "functions/get.main",
      "GET /notes": "functions/list.main",
      "PUT /notes/{id}": "functions/update.main",
      "DELETE /notes/{id}": "functions/delete.main",
      "POST /billing": "functions/billing.main",
      "POST /sendEmail": "functions/ses_sendemail.main",
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
  });

  return {
    api,
  };
}
