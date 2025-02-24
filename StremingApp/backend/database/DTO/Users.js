import { supabase } from "../dbConfig.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from 'uuid';
import { mailService } from "../services/mail-service.js";
import { TokenService } from "../services/token-service.js";
import {ApiError} from "../../exceptions/api-error.js";

export class Users {
    static async registration(login, email, password) {
        try {
            const { data: candidate, error } = await supabase.from("Users")
                .select("email")
                .or(`email.eq.${email},login.eq.${login}`);

            if (candidate && candidate.length > 0) {
                throw ApiError.BadRequest(`User with email ${email} already exists`);
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


            await mailService.sendEmail(email, `${process.env.SERVER_URL}/users/activate/${activationLink}`);
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

    static async activate(activationLink) {
        if (!activationLink) {
            throw new Error("Activation link is required");
        }

        const { data: user, error: userError } = await supabase
            .from("Users")
            .select('*')
            .eq('activation_link', activationLink)

        if (userError) {
            throw new Error(`Error fetching user: ${userError.message}`);
        }


        console.log('user from db: ' + user[0])

        if (!user) {
            throw new Error("User with this activation link does not exist");
        }

        if (user && user[0].is_activated) {
            throw new Error("This account is already activated");
        }

        const { error: updateError } = await supabase
            .from("Users")
            .update({ is_activated: true })
            .eq('id', user[0].id);

        if (updateError) {
            throw new Error(`Error activating user: ${updateError.message}`);
        }

        return {
            message: "User successfully activated",
            userId: user[0].id,
        };
    }

    static async login(email,login,password){
         const { data: user, error } = await supabase.from("Users")
            .select("*")
            .or(`email.eq.${email},login.eq.${login}`);

         if(!user && user.length > 0) {
             throw ApiError.BadRequest(`User with ${login} does not exist`);
         }

         const isPasswordMatch = await bcrypt.compare(password, user[0].password);
         if (!isPasswordMatch) {
             throw ApiError.BadRequest(`The passwords do not match`);
         }

        const tokens = TokenService.generateTokens({ email, login });
        await TokenService.saveToken(user[0].id, tokens.refreshToken);

        return {
            ...tokens,
            user
        };
    }

}
