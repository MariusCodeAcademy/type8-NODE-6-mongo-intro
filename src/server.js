const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const usersRoutes = require('./api/users');
const { PORT } = require('./config');

const app = express();

// MiddleWare
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/', usersRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({ err: 'not found' });
});

app.listen(PORT, () => console.log('server running on port', +PORT));
