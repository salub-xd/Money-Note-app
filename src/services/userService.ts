import { httpAxios } from "@/helpers/httpAxios";

export async function userLogin(user: any) {
    const result = await httpAxios.post('/api/users/login', user).then((response) => response.data);
    return result;

}

export async function userSignup(user: any) {
    const result = await httpAxios.post('/api/users/register', user).then((response) => response.data);
    return result;

}

export async function userCurrent() {
    const result = await httpAxios.get('/api/users/currentUser').then((response) => response.data);
    return result;

}

export async function userLogout() {
    const result = await httpAxios.get('/api/users/logout').then((response) => response.data);
    return result;

}