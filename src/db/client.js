import { MongoClient } from 'mongodb';
import { setUpMongoDBProcessWatchers } from './watchers';
const dotenv = require('dotenv');

let mongoDBClient = null;
console.log(process.env.DB_CONNECTION_STRING);
const listDatabases = async () => {
  const databasesList = await mongoDBClient.db().admin().listDatabases();

  console.log('Bases de datos:');
  databasesList.databases.forEach((db) => console.log(`    - ${db.name}`));
  console.log('');
};

export const connectToMongoDB = async () => {
  dotenv.config();
  const connectionString = process.env.DB_CONNECTION_STRING;

  mongoDBClient = new MongoClient(connectionString);

  try {
    console.log('Conectandose a MongoDB...');
    await mongoDBClient.connect();
    console.log('Conexion con MongoDB establecida.');
    await listDatabases();
  } catch (e) {
    console.log('Error conectandose a MongoDB');
    console.error(e);
  } finally {
    setUpMongoDBProcessWatchers();
  }
};

export { mongoDBClient };
