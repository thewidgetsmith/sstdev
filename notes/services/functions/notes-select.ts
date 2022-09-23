import handler from '../utils/handler'
import dynamodb from '../utils/dynamodb'
import logger from '../utils/logger'

export const main = handler(async (event) => {
  const params = {
    TableName: process.env.TABLE_NAME,
    // 'Key' defines the partition key and sort key of the item to be retrieved.
    Key: {
      userId: '123', // The id of the author
      noteId: event.pathParameters.noteId // The id of the note from the path
    }
  }

  const result = await dynamodb.get(params)
  if (!result.Item) {
    throw new Error('Item not found.')
  }

  logger.info({ noteId: event.pathParameters.noteId }, 'handle create complete')

  // Return the retrieved item
  return result.Item
})
