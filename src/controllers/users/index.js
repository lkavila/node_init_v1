import { Router } from 'express';
import { mongoDBClient } from '../../db/client';

const dbName = process.env.DB_NAME;

const router = Router();

router.post('/create', async (_req, res) => {
  const { username, email, age } = _req.body;
  const result = await mongoDBClient.db(dbName).collection('users').insertOne({
    username,
    email,
    age,
    createdAt: new Date(),
  });
  res.json({
    message: 'Se ha creado un nuevo usuario',
    newTodoId: result.insertedId,
  });
});

export default router;
