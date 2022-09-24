export default function handler(lambda) {
  return async function (event, ctx) {
    let body, statusCode

    try {
      // Run the Lambda
      body = await lambda(event, ctx)
      statusCode = 200
    } catch (err) {
      console.error(err)
      body = { error: err.message }
      statusCode = 500
    }

    return {
      statusCode,
      body: JSON.stringify(body),
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      }
    }
  }
}
