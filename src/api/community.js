import {request} from "@/utils/request.js";
// import { createPinia } from 'pinia';

export async function create_post(data) {
    try{
        const response = await request({
            method: 'post',
            url: '/community/create_post',
            data
        });
        console.log("res",response);
    } catch (error) {
        console.error("Login failed:", error);
        throw error;
    }
}

export async function get_post(params) {
    try{
        const response = await request({
            method: 'get',
            url: `/community/get_post?${params}`
        });
        console.log("res",response);
    } catch (error) {
        console.error("Login failed:", error);
        throw error;
    }
}

export async function search_post(params) {
    try{
        const response = await request({
            method: 'get',
            url: `/community/search_post?${params}`
        });
        console.log("res",response);
    } catch (error) {
        console.error("Login failed:", error);
        throw error;
    }
}

export async function get_my_post_list() {
    try{
        const response = await request({
            method: 'get',
            url: '/community/get_my_post_list'
        });
        console.log("res",response);
    } catch (error) {
        console.error("Login failed:", error);
        throw error;
    }
}

export async function get_favorite_post_list(params) {
    try{
        const response = await request({
            method: 'get',
            url: '/community/get_favorite_post_list'
        });
        console.log("res",response);
    } catch (error) {
        console.error("Login failed:", error);
        throw error;
    }
}

export async function favorite_post(params) {
    try{
        const response = await request({
            method: 'get',
            url: `/community/favorite_post'?${params}`
        });
        console.log("res",response);
    } catch (error) {
        console.error("Login failed:", error);
        throw error;
    }
}

export async function create_comment(params) {
    try{
        const response = await request({
            method: 'get',
            url: `/community/create_comment'?${params}`
        });
        console.log("res",response);
    } catch (error) {
        console.error("Login failed:", error);
        throw error;
    }
}