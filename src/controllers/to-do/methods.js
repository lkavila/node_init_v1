import { ObjectId } from 'mongodb';
import { mongoDBClient } from '../../db/client';

const dbName = process.env.DB_NAME;

export const getAllTodos = async () => {
  const cursor = await mongoDBClient
    .db(dbName)
    .collection('to-do-items')
    .find();

  const todos = await cursor.toArray();
  return todos;
};

export const getAllTodosByState = async (isCompleted) => {
  const cursor = await mongoDBClient
    .db(dbName)
    .collection('to-do-items')
    .find({ isCompleted });

  const todos = await cursor.toArray();
  return todos;
};

export const getTodoById = async (todoId) => {
  const queryId = new ObjectId(todoId);
  const result = await mongoDBClient
    .db(dbName)
    .collection('to-do-items')
    .findOne({ _id: queryId });

  return result;
};

export const createTodo = async (req, res) => {
  const { createdBy, title, task, minutesAprox } = req.body;
  const result = await mongoDBClient
    .db(dbName)
    .collection('to-do-items')
    .insertOne({
      isCompleted: false,
      createdBy,
      title,
      task,
      minutesAprox,
      createdAt: new Date(),
      completedAt: null,
    });
  return result;
};

export const updateTodo = async (todoId, updatedTodo) => {
  const queryId = new ObjectId(todoId);
  const { title, task } = updatedTodo;

  const result = await mongoDBClient
    .db(dbName)
    .collection('to-do-items')
    .updateOne({ _id: queryId }, { $set: { title, task } });
  return result;
};

export const completeTodo = async (todoId) => {
  const queryId = new ObjectId(todoId);

  const result = await mongoDBClient
    .db(dbName)
    .collection('to-do-items')
    .updateOne(
      { _id: queryId },
      { $set: { isCompleted: true, completedAt: new Date() } }
    );
  return result;
};

export const deleteTodo = async (todoId) => {
  const queryId = new ObjectId(todoId);

  const result = await mongoDBClient
    .db(dbName)
    .collection('to-do-items')
    .deleteOne({ _id: queryId });

  return result;
};
