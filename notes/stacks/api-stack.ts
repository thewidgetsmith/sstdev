import { Api, use } from '@serverless-stack/resources'
import { StorageStack } from './storage-stack'

export function ApiStack({ stack, app }) {
  const { table } = use(StorageStack)

  // Create the API
  const api = new Api(stack, 'Api', {
    defaults: {
      authorizer: 'iam',
      function: {
        permissions: [table],
        environment: {
          TABLE_NAME: table.tableName,
          STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY || ''
        }
      }
    },
    routes: {
      "POST /dues": "functions/dues-stripe-trxn.main",
      'GET /notes': 'functions/notes-search.main',
      'POST /notes': 'functions/notes-create.main',
      'DELETE /notes/{noteId}': 'functions/notes-delete.main',
      'GET /notes/{noteId}': 'functions/notes-select.main',
      'PUT /notes/{noteId}': 'functions/notes-update.main'
    }
  })

  // Show the API endpoint in the output
  stack.addOutputs({
    ApiEndpoint: api.url
  })

  // Return the API resource
  return {
    api
  }
}
