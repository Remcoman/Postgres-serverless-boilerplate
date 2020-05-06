const apiHandler = require('./lib/api-handler');
const Game = require('./lib/models/game');

/**
 * @type {import('aws-lambda').Handler}
 */
async function handler(event, context) {
    const data = await Game.fromJson(event.body).$query().insert();

    return {
        statusCode: 200,
        body: data.toJSON(),
    }
}

exports.handler = apiHandler(handler);