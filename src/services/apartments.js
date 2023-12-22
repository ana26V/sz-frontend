import { axiosInstance } from './rooms';
export function getAllApartments() {
    return axiosInstance.get('/api/apartments/getAllApartments')
}
export function getApartmentByID(id) {
    return axiosInstance.get(`/api/apartments/${id}`)
}