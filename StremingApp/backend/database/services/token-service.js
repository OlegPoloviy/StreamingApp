import jwt from 'jsonwebtoken';
import { supabase } from "../dbConfig.js";

export class TokenService {
    static generateTokens(payload) {
        try {
            const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '1d' });
            const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '30d' });
            return { accessToken, refreshToken };
        } catch (err) {
            throw new Error(`Token generation failed: ${err.message}`);
        }
    }

    static async saveToken(userId, refreshToken) {
        const { data: tokenData, error: selectError } = await supabase.from('token')
            .select('*')
            .eq('user', userId);

        if (selectError && selectError) {
            throw new Error(`Error loading token: ${selectError.message}`);
        }

        if (tokenData.length > 0) {
            const { data: updatedToken, error: updateError } = await supabase.from('token')
                .update({ refreshToken })
                .eq('user', userId);

            if (updateError) {
                throw new Error(`Failed to update token: ${updateError.message}`);
            }
            return updatedToken;
        }

        const { data: insertedToken, error: insertError } = await supabase.from('token')
            .insert({ user: userId, refreshToken })
            .select()

        if (insertError) {
            throw new Error(`Failed to insert token: ${insertError.message}`);
        }

        return insertedToken;
    }
}
