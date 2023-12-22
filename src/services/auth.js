import axios from 'axios';
export function getAllUsers() {
    return axios.get('/api/users/getAllUsers')
}
export function getUserByID(id) {
    return axios.get(`/api/users/${id}`)
}
export function register(user) {
    return axios.post('/api/users/register',user)
}
export function login(user) {
    return axios.post('/api/users/login',user)
}
