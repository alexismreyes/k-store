import express from 'express';
import data from './data.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRoutes.js';

dotenv.config(); //loads the .env
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Everything is OK with Atlas!!!');
  })
  .catch((err) => {
    console.log('Something went wrong with Atlas!!!');
  }); //connect to string

const app = express();
//app.use('/api/seed', seedRouter);
app.use('/api/products', productRouter);

app.get('/api/products', (req, res) => {
  res.send(data.products);
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Serving at http://localhost:${port}`);
});
