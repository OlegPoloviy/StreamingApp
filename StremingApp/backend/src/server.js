import express from "express";
import {appRouter} from "../routes/appRouter.js";
import cors from "cors";
import "dotenv/config"
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { filmRouter } from "../routes/filmsRouter.js";
import session from "express-session";
import {tockenRouter} from "../routes/tocken.js";
import {ErrorMiddleware} from "./middlewares/errorMiddleware.js";


const PORT = process.env.SERVER_PORT;
const app = express();

app.use(express.json())
app.use(bodyParser.urlencoded())
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET,
    cookie: {
        secure: false,
        httpOnly: false,
        sameSite: 'none',
    },
}))
app.use(cors({
    origin: 'http://localhost:5173', // Порт вашого React
    credentials: true, // Дозволяє передачу кукі
}));
app.use(appRouter);
app.use('/users',tockenRouter)
app.use('/films',filmRouter)
app.use(ErrorMiddleware)
// app.use("/users",userRouter)

app.listen(PORT,() => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
