import { Router } from "express";
import { Films } from "../database/DTO/Films.js";

export const filmRouter = Router();

filmRouter.get('/', async (req,res) => {
    try{
        const films = await Films.getAllFilms();
        res.status(200).send(films);
    } catch(err){
        console.error(err);
        res.status(500).json({error: err})
    }
})