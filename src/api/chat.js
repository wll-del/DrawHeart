import {request} from "@/utils/request.js";
// import { createPinia } from 'pinia';

export async function chat(params) {
    try{
        const response = await request({
            method: 'GET',
            url: `/chat/chat?${params}`
        });
        console.log("res",response);
    } catch (error) {
        console.error("Login failed:", error);
        throw error;
    }
}
