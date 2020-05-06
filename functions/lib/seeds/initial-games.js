/**
 * @param {import('knex')} knex
 */
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('games').del()
    .then(function () {
      // Inserts seed entries
      return knex('games').insert([
        {id: 1, name: 'Mario Kart'},
        {id: 2, name: 'Guns and Canoli'},
        {id: 3, name: 'Resident Evil'}
      ]);
    })
    .then(function () {
      return knex('sites').insert([
        {id: 1, name: 'Site 1', host: 'http://www.site1.com'},
        {id: 2, name: 'Site 2', host: 'http://www.site2.com'},
        {id: 3, name: 'Site 3', host: 'http://www.site3.com'},
      ]);
    })
    .then(function () {
      return knex('reviews').insert([
        {id: 1, game_id: 1, site_id: 1, score: 10, url: '/'},
        {id: 2, game_id: 2, site_id: 2, score: 7, url: '/'},
        {id: 3, game_id: 3, site_id: 3, score: 9, url: '/'},
      ]);
    })
};
