import { mongoDBClient } from '../db/client';
const dotenv = require('dotenv');

dotenv.config();
const dbName = process.env.DB_NAME;

export const getUserByUsername = async (username) => {
  console.log('buscando username:', username);
  try {
    const userFound = await mongoDBClient
      .db(dbName)
      .collection('users')
      .findOne({ username });
    return userFound;
  } catch (err) {
    console.log(`Failed with error [${err}]`);
  }
};
