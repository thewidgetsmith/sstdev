import * as iam from 'aws-cdk-lib/aws-iam'
import { Cognito, use } from '@serverless-stack/resources'
import { StorageStack } from './storage-stack'
import { ApiStack } from './api-stack'

export function AuthStack({ stack, app }) {
  const { bucket } = use(StorageStack)
  const { api } = use(ApiStack)

  // Create a Cognito User Pool and Identity Pool
  const auth = new Cognito(stack, 'Auth', {
    login: ['email']
  })

  auth.attachPermissionsForAuthUsers(stack, [
    // allow access to the API
    api,
    // Policy granting access to a specific folder in the bucket
    new iam.PolicyStatement({
      actions: ['s3:*'],
      effect: iam.Effect.ALLOW,
      resources: [
        bucket.bucketArn + '/private/${cognito-identity.amazonaws.com:sub}/*'
      ]
    })
  ])

  // show the auth resources in the output
  stack.addOutputs({
    Region: app.region,
    UserPoolId: auth.userPoolId,
    IdentityPoolId: auth.cognitoIdentityPoolId,
    UserPoolClientId: auth.userPoolClientId
  })

  // Return the auth resource
  return {
    auth
  }
}
