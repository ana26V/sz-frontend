import axios from 'axios';
export function getallrooms() {
    return axios.get('/api/rooms/getallrooms')
}
export const getRoomByID = (id) => {
    return axios.get(`/api/rooms/${id}`);
};

export const getInventoryByID = (id) => {
    return axios.post('/api/rooms/getInventoryById', { inventoryID: id });
};
export const getFacilitiesById = (id) => {
    return axios.post('/api/rooms/getFacilitiesById', { facilitiesID: id });
};