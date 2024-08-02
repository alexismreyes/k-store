import express from 'express';
import User from '../models/userModel.js';
import argon2 from 'argon2';
import { generateToken } from '../utils.js';
import expressAsyncHandler from 'express-async-handler';

const userRouter = express.Router();

userRouter.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    console.log('req.body.password->', req.body.password);

    if (user) {
      console.log('user found!!!');
      console.log('user.password->', user.password);
      if (await argon2.verify(user.password, req.body.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: 'Invalid email or password' });
  })
);

export default userRouter;
