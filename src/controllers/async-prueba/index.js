import { Router } from 'express';

const router = Router();

const doSomethingAsync = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve('I did something'), 3000);
  });
};

const doSomething = async () => {
  return console.log(await doSomethingAsync());
};

router.get('/prueba', (_req, res) => {
  console.log('Before');
  doSomething();
  console.log('After');
  res.json('resolve');
});

export default router;
