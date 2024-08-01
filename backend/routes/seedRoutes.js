import express from 'express';
import Product from '../models/productModel.js';
import data from '../data.js';
import User from '../models/userModel.js';
import createData from '../data.js';

const seedRouter = express.Router();

seedRouter.get('/', async (req, res) => {
  const { products, users } = await createData();

  await Product.deleteMany({});
  const createdProducts = await Product.insertMany(products);
  await User.deleteMany({});
  const createdUsers = await User.insertMany(users);
  res.send({ createdProducts, createdUsers });
});

export default seedRouter;
