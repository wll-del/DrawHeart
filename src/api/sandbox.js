import {request} from "@/utils/request.js";
// import { createPinia } from 'pinia';

export async function save_work(data) {
    try{
        const response = await request({
            method: 'post',
            url: '/sandtable/save_work',
            data
        });
        console.log("res",response);
        return response;
    } catch (error) {
        console.error("Login failed:", error);
        throw error;
    }
}

export async function get_work_list() {
    try{
        const response = await request({
            method: 'get',
            url: '/sandtable/get_work_list'
        });
        console.log("res",response);
    } catch (error) {
        console.error("Login failed:", error);
        throw error;
    }
}

export async function analyse_sand(data) {
    try{
        const response = await request({
            method: 'post',
            url: '/sandtable/analyse_sand',
            data,
            timeout:360000,
        });
        console.log("res",response);
        return response;
    } catch (error) {
        console.error("Login failed:", error);
        throw error;
    }
}