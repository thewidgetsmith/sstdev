import type { DocumentClient } from 'aws-sdk/clients/dynamodb'
import type { APIGatewayProxyEvent } from 'aws-lambda'

import handler from '../utils/handler'
import dynamoDb from '../utils/dynamodb'
import logger from '../utils/logger'

export const main = handler(async (event: APIGatewayProxyEvent) => {
  const identityId = event?.requestContext?.authorizer?.iam?.cognitoIdentity?.identityId
  if (identityId === undefined) {
    return []
  }

  const params: DocumentClient.QueryInput = {
    TableName: process.env.TABLE_NAME || '',
    // 'KeyConditionExpression' defines the condition for the query
    // - 'userId = :userId': only return items with matching 'userId'
    //   partition key
    KeyConditionExpression: "userId = :userId",
    // 'ExpressionAttributeValues' defines the value in the condition
    // - ':userId': defines 'userId' to be the id of the author
    ExpressionAttributeValues: {
      // The id of the author
      ":userId": identityId,
    }
  }

  const result = await dynamoDb.query(params)

  logger.info({ result }, 'handle search complete')

  return result.Items
})
