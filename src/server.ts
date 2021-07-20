import app from './app';

require('dotenv').config({
  path: ".env"
});

app.listen(3333, process.env.APP_HOST, () => {
  console.log(`Starting API Controller at ${process.env.APP_HOST}:3333`);
});