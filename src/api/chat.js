// import {request} from "@/utils/request.js";
// import { createPinia } from 'pinia';
import { useTokenStore } from '@/store/modules/auth'; // 根据实际路径调整


export async function chat(params) {
    try{
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3600000);
        const tokenStore = useTokenStore();
        const token = tokenStore.getToken();
            
        const response = await fetch(`http://10.234.32.141:8090/chat/chat?${params}`,{
            method: 'GET',
            signal: controller.signal,
            headers:{
                'Authorization': `Bearer ${token}`
            }
        });
        // 请求完成后清除超时
        clearTimeout(timeoutId);
        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`请求失败: ${response.status} - ${errorBody}`);
        }
        
        console.log("res",response);
        return response;
    } catch (error) {
        console.error("Login failed:", error);
        throw error;
    }
}
