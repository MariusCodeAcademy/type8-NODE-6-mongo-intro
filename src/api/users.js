const express = require('express');
const { dbClient } = require('../config');

const usersRoutes = express.Router();

usersRoutes.get('/users', async (req, res) => {
  try {
    // prisinjungsim prie mongoDb
    await dbClient.connect();
    console.log('open conn');
    // atliksim veiksma (gautis duom, irasyti duom, antnaujinti )
    const usersArr = await dbClient.db('cao_intro').collection('users').find().toArray();
    console.log('usersArr ===', usersArr);
    res.json(usersArr);
  } catch (error) {
    console.log(error.message);
    res.status(500).json('something went wrong');
  } finally {
    // uzdaryti prisijungima
    await dbClient.close();
    console.log('close conn');
  }
});

usersRoutes.post('/users', async (req, res) => {
  try {
    // prisinjungsim prie mongoDb
    await dbClient.connect();
    console.log('open conn');
    // atliksim veiksma (gautis duom, irasyti duom, antnaujinti )
    const newUser = {
      name: 'James',
      hasCar: true,
      town: 'Kaunas',
    };
    const insertResult = await dbClient
      .db('cao_intro')
      .collection('users')
      .insertOne(newUser);
    console.log('insertResult ===', insertResult);
    res.json(insertResult);
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
