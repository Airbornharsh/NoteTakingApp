import { ApiStack } from "./ApiStack";
import { AuthStack } from "./AuthStack";
import { FrontendStack } from "./FrontendStack";
import { SignUpEmailStack } from "./SignUpEmailStack";
import { StorageStack } from "./StorageStack";
import { UserLinkStack } from "./UserLinkStack";

export default function main(app) {
  app.setDefaultFunctionProps({
    runtime: "nodejs16.x",
    srcPath: "services",
    bundle: {
      format: "esm",
    },
  });
  app
    .stack(StorageStack)
    .stack(ApiStack)
    .stack(AuthStack)
    .stack(FrontendStack)
    .stack(SignUpEmailStack)
    .stack(UserLinkStack);
}
