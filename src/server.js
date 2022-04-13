const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const usersRoutes = require('./api/users');

const app = express();

// MiddleWare
app.use(cors());
app.use(morgan('dev'));

// Routes
app.use('/', usersRoutes);

app.listen(3000, () => console.log('server running on port'));
