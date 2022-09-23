import { v1 as uuidV1 } from 'uuid'
import handler from '../utils/handler'
import dynamoDb from '../utils/dynamodb'
import logger from '../utils/logger'

export const main = handler(async (event) => {
  // Request body is passed in as a JSON
  // encoded string in 'event.body'
  const data = JSON.parse(event.body)

  const params = {
    TableName: process.env.TABLE_NAME,
    Item: {
      // The attributes of the item to be created
      // The id of the author
      userId: event.requestContext.authorizer.iam.cognitoIdentity.identityId,
      noteId: uuidV1(), // A unique uuid
      content: data.content, // Parsed from request body
      attachment: data.attachment, // Parsed from request body
      createdAt: Date.now()
    }
  }

  await dynamoDb.put(params)

  logger.info({ noteId: params.Item.noteId }, 'handle create complete')

  return params.Item
})
