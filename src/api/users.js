require('dotenv').config();
const express = require('express');
const { MongoClient } = require('mongodb');

const usersRoutes = express.Router();
// console.log('process.env.MONGO_DB_STRING ===', process.env.MONGO_DB_STRING);
const dbClient = new MongoClient(process.env.MONGO_DB_STRING);

usersRoutes.get('/users', async (req, res) => {
  try {
    // prisinjungsim prie mongoDb
    await dbClient.connect();
    console.log('open conn');
    // atliksim veiksma (gautis duom, irasyti duom, antnaujinti )
    res.json('conn ok');
  } catch (error) {
    console.log(error.message);
    res.status(500).json('something went wrong');
  } finally {
    // uzdaryti prisijungima
    await dbClient.close();
    console.log('close conn');
  }
});

module.exports = usersRoutes;
