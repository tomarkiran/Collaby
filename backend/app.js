import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import userRouter from "./routes/userRouter.js";
import collabrationRouter from "./routes/collabrationRouter.js";
import collabRouter from "./routes/collabRouter.js";
import {dbConnection} from "./database/dbConnection.js"
import { errorMiddleware } from "./middlewares/error.js";

const app = express();
dotenv.config({ path: "./config/config.env" });

app.use(
    cors({
        origin: "https://voluble-sprinkles-deb6f1.netlify.app",
        methods: ["GET","POST","DELETE","PUT"],
        credentials: true,
    })
);


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true }));

app.use(
    fileUpload({
    useTempFiles: true,
    tempFileDir: "/temp/",
})
);

app.use("/api/v1/user", userRouter);
app.use("/api/v1/collabration", collabrationRouter);
app.use("/api/v1/collab", collabRouter);

dbConnection();

app.use(errorMiddleware);



export default app;
