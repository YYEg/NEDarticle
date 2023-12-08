import {$authHost, $host} from "./index";
import {jwtDecode} from "jwt-decode";

export  const registration = async (email, password) => {
    const {data} = await $host.post('api/user/registration', {email, password, role: 'USER'})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const checkAdmin = async () => {
    try {
        const { data } = await $authHost.get('api/user/role');
        console.log("Admin status response:", data);
        return data.isAdmin; // Return the isAdmin property from the response data
    } catch (error) {
        console.error("Error in Api check admin status:", error);
        return false; // Return false in the case of an error
    }
};
export  const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export  const check = async () => {
    const {data} = await $authHost.get('api/user/auth')
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}