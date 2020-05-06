require('dotenv').config();

// The next hack is not recommended in production. But this file is only used in the cli.
process.env.NODE_TLS_REJECT_UNAUTHORIZED='0';

module.exports = {
    development: {
        client: 'postgresql',
        migrations: {
            directory: './functions/lib/migrations'
        },
        seeds: {
            directory: './functions/lib/seeds'
        },
        useNullAsDefault: true,
        connection: {
            database: process.env.DB_NAME,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            host: process.env.DB_HOST,
            ssl: process.env.DB_SSL === 'true'
        },
    },
    production: {
        // settings for production
    }
}