const { findMalesDb } = require('../model/usersModel');

async function malesIndex(req, res) {
  console.log('usersRoutes.get /users/males ran');
  const malesArr = await findMalesDb();

  if (malesArr === false) {
    res.status(500).json('something went wrong');
    return;
  }

  res.json(malesArr);
}

module.exports = {
  malesIndex,
};
