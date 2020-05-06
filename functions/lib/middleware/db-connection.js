const { Model } = require('objection');
const Knex = require('knex');
const { knexSnakeCaseMappers } = require('objection');

/**
 * @return {import('middy').Middy}
 */
module.exports = function dbConnection() {
    return {
        before(handler, next) {
            // The next hack should be removed when deploying to production!
            process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

            const knex = Knex({
                client: 'postgresql',
                useNullAsDefault: true,
                connection: {
                    database: process.env.DB_NAME,
                    user: process.env.DB_USER,
                    password: process.env.DB_PASSWORD,
                    host: process.env.DB_HOST,
                    ssl: process.env.DB_SSL === 'true'
                },
                debug: process.env.NODE_ENV !== 'production',

                ...knexSnakeCaseMappers() // this allows us to use camelCase in our JS code (instead of snake_case)
            });
            
            // Give the knex instance to objection.
            Model.knex(knex);

            return next();
        }
    }
}