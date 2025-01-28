import { supabase } from "../dbConfig.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from 'uuid';
import { mailService } from "../services/mail-service.js";
import { TokenService } from "../services/token-service.js";

export class Users {
    static async registration(login, email, password) {
        try {
            const { data: candidate, error } = await supabase.from("Users")
                .select("email")
                .or(`email.eq.${email},login.eq.${login}`);

            if (candidate && candidate.length > 0) {
                throw new Error("User already exists");
            }

            if (!password) {
                throw new Error("Password is required");
            }

            const hash = await bcrypt.hash(password, 10);
            const activationLink = uuid();

            const { data: user, error: userError } = await supabase.from("Users")
                .insert({ login, email, password: hash, activation_link: activationLink })
                .select();


            console.log("Insert Result -:", user);
            console.log("Insert Result - Error:", userError);

            if (userError) {
                throw new Error("Failed to register user: " + JSON.stringify(userError));
            }


            await mailService.sendEmail(email, activationLink);
            const tokens = TokenService.generateTokens({ email, login });
            await TokenService.saveToken(user[0].id, tokens.refreshToken);

            return {
                ...tokens,
                user
            };
        } catch (error) {
            throw new Error("Registration failed: " + error.message);
        }
    }
}
