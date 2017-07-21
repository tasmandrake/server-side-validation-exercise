'use strict';
exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return knex('users').insert([
        {
          id: 1,
          firstname: 'Bob',
          lastname: 'Ross',
          username: 'paint4life',
          email: 'bob@ross.com',
          phone: '3033333333',
          password: 'paintingiscool'
        },
        {
          id: 2,
          firstname: 'Leo',
          lastname: 'Davinci',
          username: 'prettyp@ints',
          email: 'leo@davinci.com',
          phone: '7207777777',
          password: 'password'
        }
      ]);
    })
    .then(() => {
  return knex.raw(
    "SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));"
  );
});
};
