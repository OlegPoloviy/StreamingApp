import {Router} from "express";

export const appRouter = Router();

appRouter.get("/",(req,res)=> {
    res.send("All ok!")
})

appRouter.get("/callback",(req,res) =>{
    try{
        res.send("Logged in")
    }catch(err){
        res.status(500).send("error logging in ",err)
    }

})