'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');
const bcrypt = require('bcrypt');
const saltRounds = 10;


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
  let password = req.body.password;

  bcrypt.hash(password, saltRounds, function(err, hash) {
    password = hash;
  });

  if (!firstname) {
    return res.send('Firstname is required')
  } else if (!lastname) {
    return res.send('Lastname is required')
  } else if (!username || username.length < 6 || username.match(/[.,\/#!$%\^&\*;:{}=\-_`~()]/) || Number(username[0])) {
    return res.send('Username is required and must be longer than 6 characters and must start with a letter and contain no punctuation')
  } else if (!email || !email.includes('@')) {
    return res.send('A valid email is required')
  } else if (!phone || String(phone).length < 10 || String(phone).length > 10 || typeof phone !== 'number') {
    return res.send('A valid 110 digit phone number is required')
  } else if (!password || password.length < 8 || !password.match(/[!?\/.,')]/) || !password.match(/[0-9]/)) {
    return res.send('Password is required and must be more than 8 characters, include a number and a special character')
  }
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
