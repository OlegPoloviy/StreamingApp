// Users.js
import { supabase } from "../dbConfig.js";
import bcrypt from "bcrypt"

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

   static async signUp(data) {
        const {login,email,password} = data;

        const hashed =  await bcrypt.hash(password,10)

       if (!login || !email || !password) {
           throw new Error('All fields (login, email, password) are required.');
       }

        const {data: result,error} = await supabase
            .from("Users")
            .insert({
                login,
                email,
                password: hashed
            })

       if(error){
           throw new Error(error.message);
       }

       return result;
   }

    static async signIn(data) {
        const { login, email, password } = data;

        // Перевірка вхідних даних
        if (!login || !password) {
            throw new Error('All fields (login, email, password) are required.');
        }

        try {
            // Пошук користувача в базі даних
            const { data: user, error } = await supabase
                .from("Users")
                .select("*")
                .eq("login", login);

            if (error) {
                throw new Error(`Database error: ${error.message}`);
            }

            // Перевірка, чи знайдено користувача
            if (!user || user.length === 0) {
                throw new Error('User not found.');
            }

            const existing = user[0];

            // Перевірка пароля
            const isPasswordValid = bcrypt.compareSync(password, existing.password);
            if (!isPasswordValid) {
                throw new Error('Wrong password.');
            }

            return existing; // Повертаємо знайденого користувача
        } catch (err) {
            // Кидаємо специфічну помилку
            throw new Error(err.message || 'An unknown error occurred.');
        }
    }
}
