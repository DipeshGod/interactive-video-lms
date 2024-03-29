import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import dotenv from "dotenv";

import { courseRouter } from "./routes/course";
import { uploadRouter } from "./routes/upload";
import { authRouter } from "./routes/auth";
import { userRouter } from "./routes/user";
import { courseModuleRouter } from "./routes/courseModule";
import { reviewRouter } from "./routes/review";
import { exerciseRouter } from "./routes/exercise";
import { enterpriseRouter } from "./routes/enterprise";
import { progressRouter } from "./routes/progress";
import { userEnrolledRouter } from "./routes/userEnrolled";
import { QNARouter } from "./routes/qna";
import { enterpriseSectionRouter } from "./routes/enterpriseSection";
import { noteRouter } from "./routes/note";

dotenv.config();

const app = express();

//body parser middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.static("src/upload"));
app.use(express.json());
app.use(fileUpload());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//route handlers
app.use("/api/course", courseRouter);
app.use("/api/upload", uploadRouter);
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/course-module", courseModuleRouter);
app.use("/api/review", reviewRouter);
app.use("/api/exercise", exerciseRouter);
app.use("/api/enterprise", enterpriseRouter);
app.use("/api/progress", progressRouter);
app.use("/api/enrolled", userEnrolledRouter);
app.use("/api/qna", QNARouter);
app.use("/api/enterprise-section", enterpriseSectionRouter);
app.use("/api/note", noteRouter);

mongoose.connect(
  process.env.ATLAS_URI!,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  () => {
    app.listen(process.env.PORT, () => {
      console.log(`Server listening at `, process.env.PORT);
    });
  }
);
