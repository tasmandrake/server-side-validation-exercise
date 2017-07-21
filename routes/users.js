'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');


router.get('/' , (req, res, next) => {
  knex('users')
    .select( 'id', 'firstname', 'lastname', 'username', 'phone', 'email')
    .then((results) => {
      res.send(results);
    })
    .catch((err) => {
      res.send(err);
    });
});

router.post('/' , (req, res, next) => {
  const firstname = req.body.users.firstName;
  const lastname = req.body.users.lastName;
  const username = req.body.users.username;
  const email = req.body.users.email;
  const phone = req.body.users.phone;

  if (!firstname) {
    return res.send('Firstname is required')
  } else if (!lastname) {
    return res.send('Lastname is required')
  } else if (!username && username.length < 6 && username.includes(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g) && Number(username[0])) {
    return res.send('Username is required and must be longer than 6 characters and must start with a letter')
  } else if (!email && email.includes('@')) {
    return res.send('A valid email is required')
  } else if (!phone && String(phone).length < 10 && String(phone).length > 10) {
    return res.send('A valid 110 digit phone number is required')
  }
  // else if (!password) {
  //   return res.send('Firstname is required')
  // }
  knex('users')
    .insert({
      firstname,
      lastname,
      username,
      email,
      phone
    })
    .returning(['firstname', 'lastname', 'username','phone','email'])
    .then((results) => {
      res.send(results[0]);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
