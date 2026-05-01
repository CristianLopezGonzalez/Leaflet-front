import api from "./api";

const online = async () => {
    try {

        const response = await api.get("/user/online");
        return response.data;

    }catch (error) {
        console.error("Online check error:", error);
        throw error;
    }
}

const profile = async () => {
    try {

        const response = await api.get("/user/profile");
        return response.data;

    }catch (error) {
        console.error("Profile check error:", error);
        throw error;
    }
}

const getUserLocation = async () => {
    try {

        const response = await api.get("/user/location");
        return response.data;

    }catch (error) {
        console.error("Get user location error:", error);
        throw error;
    }
}

export default {
    online,
    profile,
    getUserLocation,
}