const express = require('express');
const { dbClient } = require('../config');
const { malesIndex } = require('../controller/usersController');
const { findMalesDb } = require('../model/usersModel');

const usersRoutes = express.Router();
const dbName = 'node7';
const collName = 'users';

usersRoutes.get('/users', async (req, res) => {
  try {
    // prisinjungsim prie mongoDb
    await dbClient.connect();
    console.log('open conn');
    // atliksim veiksma (gautis duom, irasyti duom, antnaujinti )
    const resourse = dbClient.db(dbName).collection(collName);
    const usersArr = await resourse.find().toArray();
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

// GET /api/user/students - atrenkam tik studentus
// eslint-disable-next-line no-use-before-define
usersRoutes.get('/users/students', sudentsController);
async function sudentsController(req, res) {
  try {
    // prisijungti
    await dbClient.connect();
    // atlikti veiksmus
    const query = { isStudent: true };
    const resourse = dbClient.db(dbName).collection(collName);
    const studArr = await resourse.find(query).toArray();
    res.json(studArr);
  } catch (error) {
    console.log('sudentsController === error', error);
    res.status(500).json('something went wrong');
  } finally {
    // atsijungti
    await dbClient.close();
  }
}

// GET /api/user/males - atrenkam tik vyrus
// usersRoutes.get('/users/males', malesIndex)
usersRoutes.get('/users/males', async (req, res) => {
  console.log('usersRoutes.get /users/males ran');
  const malesArr = await findMalesDb();

  if (malesArr === false) {
    res.status(500).json('something went wrong');
    return;
  }
  res.json(malesArr);
});

usersRoutes.get('/users/females', async (req, res) => {
  console.log('usersRoutes.get /users/females ran');
  const femalesArr = await findFemalesDb();

  if (femalesArr === false) {
    res.status(500).json('something went wrong');
    return;
  }
  res.json(femalesArr);
});

// GET /api/user/females - atrenkam tik moteris

// GET /api/user/age/gt/20 - atrenkam zmones vyresnius nei 20 (20 dinaminis segmentas kuriam galim paduoti koki norim skaiciu)

// extra// GET /api/user/names/James,Jane,Abby - gaunam visus zmones kuriu vardai yra surasyti per kableli po names/

module.exports = usersRoutes;
