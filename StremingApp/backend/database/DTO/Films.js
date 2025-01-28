// import prisma from "../../prisma/prisma-client.js";
import {supabase} from "../dbConfig.js";

export class Films {
    // static async getAllFilms(){
    //     const films = prisma.films.findMany()
    //     if(!films){
    //         console.error("No films")
    //     }
    //     return films;
    //
    // }

    static async getLatest() {
        const { data, error } = await supabase
            .from('Films')
            .select("*")
            .order('id', { ascending: false })
            .limit(4);
    
        if (error) {
            console.error('Error loading latest films: ', error);
        }
    
        return data;
    }
    
}