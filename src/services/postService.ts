import { httpAxios } from "@/helpers/httpAxios";

export async function userAddPost(post:any) {
    const result = await httpAxios.post('/api/posts', post).then((response) => response.data);
    return result;

}

export async function userGetPost() {
    const result = await httpAxios.get(`/api/posts/user`).then((response) => response.data);
    return result;

}