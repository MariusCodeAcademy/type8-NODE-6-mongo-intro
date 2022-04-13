const express = require('express');

const usersRoutes = express.Router();

usersRoutes.get('/users', (req, res) => {
  res.json('GET /users route');
});

module.exports = usersRoutes;
