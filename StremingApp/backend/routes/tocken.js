import {Router} from "express";
import {UserController} from "../database/controllers/user-controller.js"

export const tockenRouter =  Router();

tockenRouter.post('/registration',UserController.registration);
tockenRouter.post('/login',UserController.login);
tockenRouter.post('/logout',UserController.logout);
tockenRouter.get('/activate/:link',UserController.activate);
// tockenRouter.get('/refresh')
tockenRouter.get('/users',UserController.getAllUsers);

