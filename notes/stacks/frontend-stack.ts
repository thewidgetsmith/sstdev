import { ReactStaticSite, use } from "@serverless-stack/resources";
import { ApiStack } from "./api-stack";
import { AuthStack } from "./auth-stack";
import { StorageStack } from "./storage-stack";

export function FrontendStack({ stack, app }) {
  const { api } = use(ApiStack);
  const { auth } = use(AuthStack);
  const { bucket } = use(StorageStack);

  const customDomain =
    app.stage === "prod"
      ? {
          domainName: "emra.me",
          domainAlias: "www.emra.me",
        }
      : undefined;

  // Define our React app
  const site = new ReactStaticSite(stack, "ReactSite", {
    customDomain,
    path: "frontend",
    // Pass in our environment variables
    environment: {
      REACT_APP_API_URL: api.customDomainUrl || api.url,
      REACT_APP_REGION: app.region,
      REACT_APP_BUCKET: bucket.bucketName,
      REACT_APP_USER_POOL_ID: auth.userPoolId,
      REACT_APP_IDENTITY_POOL_ID: auth.cognitoIdentityPoolId,
      REACT_APP_USER_POOL_CLIENT_ID: auth.userPoolClientId,
    },
  });

  // Show the url in the output
  stack.addOutputs({
    SiteUrl: site.customDomainUrl || site.url,
  });
}
