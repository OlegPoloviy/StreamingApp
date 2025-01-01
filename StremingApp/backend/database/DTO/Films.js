import {supabase} from "../dbConfig.js";

export class Films {
    static async getAllFilms(){
        const {data,error} = await supabase.from('Films')
        .select('*')

        if(error) {
            console.error('Error lading all films: ',error)
        }

        return data;
    }
}