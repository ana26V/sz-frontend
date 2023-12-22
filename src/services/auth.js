import { axiosInstance } from './rooms';
export function getAllUsers() {
    return axiosInstance.get('/api/users/getAllUsers')
}
export function getUserByID(id) {
    return axiosInstance.get(`/api/users/${id}`)
}
export function register(user) {
    return axiosInstance.post('/api/users/register',user)
}
export function login(user) {
    return axiosInstance.post('/api/users/login',user)
}
