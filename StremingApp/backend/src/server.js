import express from "express";
import {appRouter} from "../routes/appRouter.js";
import {userRouter} from "../routes/usersRouter.js";
import {auth} from "express-openid-connect";
import {config} from "../auth/auth.js";
import cors from "cors";
import "dotenv/config"
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { filmRouter } from "../routes/filmsRouter.js";
import session from "express-session";

const PORT = process.env.SERVER_PORT;
const app = express();

app.use(auth(config));
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET,
    cookie: {
        secure: false, // true для HTTPS
        httpOnly: false,
        sameSite: 'none', // 'lax' або 'none' для міждоменного використання
    },
}))
app.use(cors({
    origin: 'http://localhost:5173', // Порт вашого React
    credentials: true, // Дозволяє передачу кукі
}));
app.use(bodyParser.json())
app.use(appRouter);
app.use('/films',filmRouter)
app.use("/users",userRouter)

app.listen(PORT,() => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
app.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});