import {Users} from "../DTO/Users.js"
import {validationResult} from "express-validator";
import {ApiError} from "../../exceptions/api-error.js";

export class UserController {
    static async registration(req,res,next){
        try{
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return next(ApiError.BadRequest("Validation error", errors.array()));
            }
            const {login,email,password} = req.body;
            console.log(req.body)
            const userData = await Users.registration(login,email,password);

            res.cookie('refreshToken',userData.refreshToken,{maxAge: 30 * 24 * 60 * 1000,httpOnly:true});
            return res.json(userData)
        }catch(err){
            console.error(err)
        }
    }
    static async login(req,res,next){
        try{
            const {email,login,password} = req.body;

            const userData = await Users.login(email,login,password);
            res.cookie('refreshToken',userData.refreshToken,{maxAge: 30 * 24 * 60 * 1000,httpOnly:true});
            return res.json(userData)
        }catch(err){
            res.status(401).send({error:err.message})
        }
    }

    static async activate(req,res,next){
        try{
            const activationLink = req.params.link;
            console.log(activationLink)
            await Users.activate(activationLink);
            return res.redirect(process.env.CLIENT_URL)
        }catch(err){
            console.error(err)
        }
    }

    static async logout(req,res,next){
        try{

        }catch(err){

        }
    }

    static async getAllUsers(req,res,next){
        try {
            res.json(['user1','user2']);
        }catch(err){

        }
    }
}