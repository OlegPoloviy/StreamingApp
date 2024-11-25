import {Users} from "../database/DTO/Users.js"
import {Router} from "express";
import pkg from 'express-openid-connect';
const { requiresAuth } = pkg;



export const userRouter = Router();

userRouter.get("/all",async (req,res) =>{
    try {
        const users = await Users.getUsers();
        res.send(users)
    }catch(err){
        res.status(500).send(err)
    }
})

userRouter.post("/register",async (req,res) => {
    try {
        const data = req.body;
        await Users.signUp(data);
        res.send(`User ${data.email} registered`)
    }catch(err){
        console.error(err)
        res.status(500).send(err)
    }
})

userRouter.post("/signup", async (req, res) => {
    try {
        const data = req.body;
        const user = await Users.signIn(data);

        // res.cookie("login",user.login,{
        //     secure: false, // true для HTTPS на продакшені
        //     sameSite: 'none', // Дозволяє передачу кукі між доменами
        // });
        // res.cookie("email",user.email,{
        //     secure: false, // true для HTTPS на продакшені
        //     sameSite: 'none', // Дозволяє передачу кукі між доменами
        // });
        req.session.login = user.login;
        req.session.email = user.email;

        console.log(req.session);
        res.status(200).json({
            message: `Signed up successfully, welcome ${user.login}`,
            user: { login: user.login, email: user.email, image: user.photo_link },
        });
       
    } catch (err) {
        console.error('Signup Error:', err.message);

        const statusCode = err.message.includes('not found')
            ? 404
            : err.message.includes('Wrong password')
                ? 401
                : 400;

        res.status(statusCode).json({
            error: err.message || 'An unknown error occurred.',
        });
    }
});
