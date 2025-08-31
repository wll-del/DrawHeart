import {request} from "@/utils/request.js";
// import { createPinia } from 'pinia';

export async function save_work(params) {
    try{
        const response = await request({
            method: 'get',
            url: `/sandtable/save_work?${params}`
        });
        console.log("res",response);
    } catch (error) {
        console.error("Login failed:", error);
        throw error;
    }
}

export async function get_work_list(params) {
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

export async function analyse_sand(params) {
    try{
        const response = await request({
            method: 'get',
            url: `/sandtable/analyse_sand?${params}`
        });
        console.log("res",response);
    } catch (error) {
        console.error("Login failed:", error);
        throw error;
    }
}