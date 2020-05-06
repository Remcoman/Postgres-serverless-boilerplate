const middy = require('middy');
const { jsonBodyParser, httpErrorHandler, doNotWaitForEmptyEventLoop } = require('middy/middlewares');
const dbConnection = require('./middleware/db-connection');

/**
 * @param {import('aws-lambda').Handler} handler
 */
module.exports = function createApiHandler(handler) {
    return middy(handler)
        .use(doNotWaitForEmptyEventLoop())
        .use(jsonBodyParser())
        .use(dbConnection())
        .use(httpErrorHandler())
}