import handler from '../utils/handler'
import dynamoDb from '../utils/dynamodb'
import logger from '../utils/logger'

export const main = handler(async (event) => {
  const params = {
    TableName: process.env.TABLE_NAME,
    // 'Key' defines the partition key and sort key of the item to be removed
    Key: {
      userId: '123', // The id of the author
      noteId: event.pathParameters.noteId, // The id of the note from the path
    }
  }

  await dynamoDb.delete(params)

  logger.info({ noteId: event.pathParameters.noteId }, 'handle delete complete')

  return { status: true }
})
