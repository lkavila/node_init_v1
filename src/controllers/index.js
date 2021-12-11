import TodoRouter from './to-do';
import AsyncPrueba from './async-prueba';
import Users from './users';

export const setUpControllers = (app) => {
  app.use('/to-do', TodoRouter);
  app.use('/async', AsyncPrueba);
  app.use('/users', Users);
};
