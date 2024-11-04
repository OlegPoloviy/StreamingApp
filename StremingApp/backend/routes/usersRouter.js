import {Users} from "../database/DTO/Users.js"
import {Router} from "express";

export const userRouter = Router();

userRouter.get("/all",async (req,res) =>{
    try {
        const users = await Users.getUsers();
        res.send(users)
    }catch(err){
        res.status(500).send(err)
    }
})