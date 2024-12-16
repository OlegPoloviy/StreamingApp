import axios from "axios";

export const loginUser = async (values) => {
    try {
        const response = await axios.post("http://localhost:3030/users/signup", values, {
            withCredentials: true,
        });
        return response.data; // повертаємо дані користувача
    } catch (error) {
        throw error.response?.data?.error || "An error occurred.";
    }
};
