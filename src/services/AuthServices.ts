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

type AuthResponseLike = {
    accessToken?: string;
    token?: string;
    data?: {
        accessToken?: string;
        token?: string;
    };
};

const extractAccessToken = (responseData: AuthResponseLike) => {
    return (
        responseData.accessToken ??
        responseData.token ??
        responseData.data?.accessToken ??
        responseData.data?.token ??
        null
    );
};

const login = async (data: LoginData) => {
    try {
        const response = await api.post<AuthResponseLike>("/auth/login", data);
        const accessToken = extractAccessToken(response.data);

        if (!accessToken) {
            throw new Error("Login response did not include an access token");
        }

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
        const response = await api.post<AuthResponseLike>("/auth/refresh-token", data);
        const accessToken = extractAccessToken(response.data);

        if (!accessToken) {
            throw new Error("Refresh token response did not include an access token");
        }

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