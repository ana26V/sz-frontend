import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: "https://hotel-szz.onrender.com",

})
export function getallrooms() {
    return axiosInstance.get('/api/rooms/getallrooms')
}
export const getRoomByID = (id) => {
    return axiosInstance.get(`/api/rooms/${id}`);
};

export const getInventoryByID = (id) => {
    return axiosInstance.post('/api/rooms/getInventoryById', { inventoryID: id });
};
export const getFacilitiesById = (id) => {
    return axiosInstance.post('/api/rooms/getFacilitiesById', { facilitiesID: id });
};