import { App } from "@serverless-stack/resources";

import { ApiStack } from './api-stack'
import { StorageStack } from "./storage-stack";

export default function (app: App) {
  app.setDefaultFunctionProps({
    runtime: "nodejs16.x",
    srcPath: "services",
    bundle: {
      format: "esm",
    },
  });
  app.stack(StorageStack).stack(ApiStack);
}
