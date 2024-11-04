import express from "express";
import {appRouter} from "../routes/appRouter.js";
import {userRouter} from "../routes/usersRouter.js";
import "dotenv/config"

const PORT = process.env.SERVER_PORT;
const app = express();

app.use(appRouter);
app.use("/users",userRouter)

app.listen(PORT,() => {
    console.log(`Server is running on http://localhost:${PORT}`)
})
