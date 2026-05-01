import api from "./api";

export interface LoginData {
    email: string;
    password: string;
}

export interface RegisterData {
    username: string;
    email: string;
    password: string;
}

export interface RefreshTokenData {
    refreshToken: string;
}

export interface AuthResponse {
    accessToken: string;
}

const login = async (data: LoginData) => {
    try {
        const response = await api.post<AuthResponse>("/auth/login", data);
        const { accessToken } = response.data;
        localStorage.setItem("accessToken", accessToken);
        return response.data;
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
};

const logout = async () => {
    try {
        await api.post("/auth/logout");
    } catch (error) {
        console.error("Logout error:", error);
        throw error;
    } finally {
        localStorage.removeItem("accessToken");
    }
};

const refreshToken = async (data: RefreshTokenData) => {
    try {
        const response = await api.post<AuthResponse>("/auth/refresh-token", data);
        const { accessToken } = response.data;
        localStorage.setItem("accessToken", accessToken);
        return response.data;
    } catch (error) {
        console.error("Refresh token error:", error);
        throw error;
    }
};

const logoutAll = async () => {
    try {
        await api.post("/auth/logout-all");
    } catch (error) {
        console.error("Logout-all error:", error);
        throw error;
    } finally {
        localStorage.removeItem("accessToken");
    }
};

export default {
    login,
    logout,
    refreshToken,
    logoutAll
};