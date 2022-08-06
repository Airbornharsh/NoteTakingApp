import { Function } from "@serverless-stack/resources";

export function UserLinkStack({ stack, app }) {
  new Function(stack, "UserLink", {
    handler: "../services/functions/LinkUserAccounts/index.main",
  });
}
