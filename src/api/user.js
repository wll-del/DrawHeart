import {request} from "@/utils/request.js";
// import { createPinia } from 'pinia';
import { useTokenStore } from '@/store/modules/auth';

export async function login(data) {
    const tokenStore = useTokenStore();
    try{
        const response = await request({
            method: 'POST',
            url: '/users/login',
            data,
        });
        console.log("res",response);
        if (response.status_code == 200) {
            const token = response.access_token;
            tokenStore.setToken(token);
            console.log("token is ", token)
            return response;
        } else {
            throw new Error("Token not found in response");
        }
    } catch (error) {
        console.error("Login failed:", error);
        throw error;
    }
}

export function modify_username(data) {
    return request({
        method: 'post',
        url: '/user/modify_username',
        data
    })
}

export function register(data) {
    return request({
        method: 'post',
        url: '/user/register',
        data
    })
}

export function check_session() {
    return request({
        method: 'get',
        url: '/user/check_session',
    })
}
export function Logout(){
    return request({
        method: 'get',
        url: '/user/logout',
    })
}
