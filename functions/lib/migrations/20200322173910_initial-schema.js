
/**
 * @param {import('knex')} knex 
 */
exports.up = function(knex) {
    /**
     * This schema is for an example app which shows a list of games where each game has a list of reviews posted by a Game site
     */
    return Promise.all([
        knex.schema.createTable('games', (table) => {
            table.increments('id');
            table.string('name');
            table.string('image');
            table.unique(['name']);
        }),
        knex.schema.createTable('sites', (table) => {
            table.increments('id');
            table.string('name');
            table.string('host');

            table.unique('name');
        }),
        knex.schema.createTable('reviews', (table) => {
            table.increments('id');
            table.integer('site_id').references('id').inTable('sites');
            table.integer('game_id').references('id').inTable('games').onDelete('CASCADE');
            table.string('url');
            table.integer('score');
            table.timestamp('created_at').defaultTo(knex.fn.now());
        })
    ]);
};

/**
 * @param {import('knex')} knex 
 */
exports.down = function(knex) {
    return Promise.all([
        knex.schema.dropTable('reviews'),
        knex.schema.dropTable('sites'),
        knex.schema.dropTable('games'),
    ]);
};
