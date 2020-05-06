const apiHandler = require('./lib/api-handler');
const Game = require('./lib/models/game');

/**
 * @type {import('aws-lambda').Handler}
 */
async function handler(event, context) {
    const data = await Game.query().withGraphJoined({
        reviews: {
            site: true
        }
    });
    return {
        statusCode: 200,
        body: JSON.stringify(data),
    }
}

exports.handler = apiHandler(handler); 