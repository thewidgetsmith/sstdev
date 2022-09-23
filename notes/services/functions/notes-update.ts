import handler from '../utils/handler'
import dynamoDb from '../utils/dynamodb'
import logger from '../utils/logger'

export const main = handler(async (event) => {
  const data = JSON.parse(event.body)
  const params = {
    TableName: process.env.TABLE_NAME,
    // 'Key' defines the partition key and sort key of the item to be updated
    Key: {
      // The id of the author
      userId: event.requestContext.authorizer.iam.cognitoIdentity.identityId,
      noteId: event.pathParameters.noteId, // The id of the note from the path
    },
    // 'UpdateExpression' defines the attributes to be updated
    // 'ExpressionAttributeValues' defines the value in the update expression
    UpdateExpression: 'SET content = :content, attachment = :attachment',
    ExpressionAttributeValues: {
      ':attachment': data.attachment || null,
      ':content': data.content || null,
    },
    // 'ReturnValues' specifies if and how to return the item's attributes,
    // where ALL_NEW returns all attributes of the item after the update; you
    // can inspect 'result' below to see how it works with different settings
    ReturnValues: 'ALL_NEW'
  }

  await dynamoDb.update(params)

  logger.info({ noteId: event.pathParameters.noteId }, 'handle update complete')

  return { status: true }
})
