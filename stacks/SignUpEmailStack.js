import { Function } from "@serverless-stack/resources";

export function SignUpEmailStack({ stack, app }) {
  new Function(stack, "email", {
    handler: "../services/functions/signupemail.handler",
  });
}
