import api from "./api";

const profile = async () => {
    try {
        const response = await api.get("/user/profile");
        return response.data;
    } catch (error) {
        console.error("Profile check error:", error);
        throw error;
    }
};

export default {
    profile,
};