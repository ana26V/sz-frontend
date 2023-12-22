import Swal from 'sweetalert2';
import { axiosInstance } from './rooms';
// export const getBookingsByUserId = (id) => {
//     return axios.get(`/api/bookings/${id}`);
// };


export const getAllBookings = () => {
    return axiosInstance.get(`/api/bookings/getallbookings`);
};
export const getAllApartmentBookings = () => {
    return axiosInstance.get(`/api/bookingsAP/getAllApartmentBookings`);
};
export const getBookingsByUserId = (id) => {
    return axiosInstance.post(`/api/bookings/getbookingsbyuserid`, { userID: id });
};
export const getApartmentBookingsByUserId = (id) => {
    return axiosInstance.post(`/api/bookingsAP/getbookingsbyuserid`, { userID: id });
};
export async function cancelBooking(bookingID, roomID) {

    try {

        const result = await (await axiosInstance.post("/api/bookings/cancelbooking", { bookingID, roomID })).data

        Swal.fire('Congrats', 'Your  bookings has been cancelled', 'success').then(result => {
            window.location.reload()
        })

    } catch (error) {
        console.log(error)

        Swal.fire('Oops', 'Something went wrong', 'error')
    }
}
export async function cancelBookingApartment(bookingID, apartmentID) {

    try {

        const result = await (await axiosInstance.post("/api/bookingsAP/cancelbooking", { bookingID, apartmentID })).data

        Swal.fire('Congrats', 'Your  bookings has been cancelled', 'success').then(result => {
            window.location.reload()
        })

    } catch (error) {
        console.log(error)

        Swal.fire('Oops', 'Something went wrong', 'error')
    }
}
