import {Router} from "express";
import {UserController} from "../database/controllers/user-controller.js"
import {body} from "express-validator"


export const tockenRouter =  Router();

tockenRouter.post('/registration',body('email').isEmail(),body('password').isLength({min: 3,max: 32}),UserController.registration);
tockenRouter.post('/login',UserController.login);
tockenRouter.post('/logout',UserController.logout);
tockenRouter.get('/activate/:link',UserController.activate);
// tockenRouter.get('/refresh')
tockenRouter.get('/users',UserController.getAllUsers);

