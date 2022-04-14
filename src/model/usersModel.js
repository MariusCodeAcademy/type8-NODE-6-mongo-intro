const { dbClient } = require('../config');

const dbName = 'node7';
const collName = 'users';

async function findMalesDb() {
  console.log('findMalesDb ran');
  try {
    // prisijungti
    await dbClient.connect();
    // atlikti veiksmus
    const query = { gender: 'male' };
    const resourse = dbClient.db(dbName).collection(collName);
    const studArr = await resourse.find(query).toArray();
    return studArr;
  } catch (error) {
    console.log('findMalesDb === error', error);
    return false;
  } finally {
    // atsijungti
    await dbClient.close();
  }
}
async function findFemalesDb() {
  console.log('findFemalesDb ran');
  try {
    // prisijungti
    await dbClient.connect();
    // atlikti veiksmus
    const query = { gender: 'female' };
    const resourse = dbClient.db(dbName).collection(collName);
    const studArr = await resourse.find(query).toArray();
    return studArr;
  } catch (error) {
    console.log('findFemalesDb === error', error);
    return false;
  } finally {
    // atsijungti
    await dbClient.close();
  }
}

async function getArrDb(query) {}

module.exports = {
  findMalesDb,
  findFemalesDb,
};
