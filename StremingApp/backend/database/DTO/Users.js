// Users.js
import { supabase } from "../dbConfig.js";

export class Users {
    static async getUsers() {
        const { data, error } = await supabase
            .from("Users")
            .select("*");

        if (error) {
            console.error("Error fetching users:", error);
            return null;
        }

        return data;
    }
}
