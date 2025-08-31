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
        const token = response.access_token;
        tokenStore.setToken(token);
        console.log("token is ", token)
        return response;
        
    } catch (error) {
        console.error("Login failed:", error);
        throw error;
    }
}

export function register(data) {
    return request({
        headers:{
            'Content-Type': 'application/json'
        },
        method: 'post',
        url: '/users/register',
        data
    })
}

