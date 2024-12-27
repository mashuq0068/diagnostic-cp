

import useAuthStore from "@/store/authStore.js";
import useLoadingStore from "@/store/loadingStore.jsx";
import axios from "@/config/axiosConfig"

export async function LoginRequests(data) {
    const{onChangeLoginData} = useAuthStore();
    const{setLoading} = useLoadingStore()

    try {
        setLoading(true);

        const res = await axios.post(`/auth/login`, data, { withCredentials: true });

        const { token } = res.data.data;
        const {permissions, roles} = await DecodeTokenRequest(token);
        const {userStatus} = await UserStatusRequest(data?.username);

        onChangeLoginData({
            token: token ,
            permission: permissions,
            role: roles[0] ,
            userStatus: userStatus
        });

        let updatedLoginData = {
            token: token ,
            permission: permissions,
            role: roles[0] ,
            userStatus: userStatus
        }
        localStorage.setItem("userData", JSON.stringify(updatedLoginData));

        return true;
    } catch (error) {
        console.error("Error during login:", error);
        return false;
    } finally {
        setLoading(false);
    }
}

export async function DecodeTokenRequest(token) {
    try {
        const res = await axios.get(`/auth/decodeToken?token=${token}`, { withCredentials: true });
        return res.data;
    }
    catch (e) {
        return null;
    }
}

export async function UserStatusRequest(userName) {
    try {
        const res = await axios.get(`/users/${userName}`, { withCredentials: true });
        return res.data.data;
    }
    catch (e) {
        return null;
    }
}