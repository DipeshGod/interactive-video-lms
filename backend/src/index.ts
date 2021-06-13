import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import cookieParser from 'cookie-parser';

//routes import
import { courseRouter } from './routes/course';
import { uploadRouter } from './routes/upload';
import { authRouter } from './routes/auth';
import { userRouter } from './routes/user';
import dotenv from 'dotenv';
import { courseModuleRouter } from './routes/courseModule';

dotenv.config();

const app = express();

//body parser middlewares
app.use(cors());
app.use(express.static('src/upload'));
app.use(express.json());
app.use(fileUpload());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//route handlers
app.use('/api/course', courseRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/course-module', courseModuleRouter);

mongoose.connect(
  'mongodb://localhost:27017/studentAssit',
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  () => {
    app.listen(5000, () => {
      console.log('server is listening on port 5000');
    });
  }
);
