import handler from '../utils/handler'
import dynamoDb from '../utils/dynamodb'
import logger from '../utils/logger'

export const main = handler(async (event) => {
  const params = {
    TableName: process.env.TABLE_NAME,
    // 'KeyConditionExpression' defines the condition for the query
    // - 'userId = :userId': only return items with matching 'userId'
    //   partition key
    KeyConditionExpression: "userId = :userId",
    // 'ExpressionAttributeValues' defines the value in the condition
    // - ':userId': defines 'userId' to be the id of the author
    ExpressionAttributeValues: {
      ":userId": "123",
    }
  }

  const result = await dynamoDb.query(params)

  logger.info({ }, 'handle search complete')

  return result.Items
})
