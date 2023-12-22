import axios from 'axios';
export function getAllApartments() {
    return axios.get('/api/apartments/getAllApartments')
}
export function getApartmentByID(id) {
    return axios.get(`/api/apartments/${id}`)
}