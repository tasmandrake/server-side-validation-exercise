'use strict';

const express = require('express');
const router = express.Router();
const knex = require('../knex');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const schema = Joi.object().keys({
  firstname: Joi.required(),
  lastname: Joi.required(),
  username: Joi.string().length(6).alphanum(),
  email: Joi.string().email(),
  phone: Joi.number(),
  // password:
})

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

  const Joi = require('joi');

  Joi.validate({ firstname, lastname, username, email, phone }, schema, (err, val) => {
    if (err) {
      return res.send(err);
    }
    return console.log(val);
  })
  
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
