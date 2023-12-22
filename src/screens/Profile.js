import React, { useEffect } from 'react'
import { Tabs } from 'antd';
import { Tag } from 'antd';
import { useFetchData } from '../hooks/useData';
import { cancelBooking, cancelBookingApartment, getApartmentBookingsByUserId, getBookingsByUserId } from '../services/bookings';
import { Card } from 'react-bootstrap';

function Profile() {

    const user = JSON.parse(localStorage.getItem("currentUser"));
    const items = [{
        key: "1",
        label: "Profile",
        children: <Card border="primary" className='lg mx-3 mt-3'>
            <Card.Header>My Profile</Card.Header>
            <Card.Body>

                <Card.Text>
                    <b>  Name: </b> {user.first_name} {user.last_name}

                </Card.Text>
                <Card.Text>
                    <b>  CNP: </b> {user.CNP} 
                </Card.Text>
                <Card.Text>
                    <b>  Address: </b> {user.address} 
                </Card.Text>

                <Card.Text>
                    <b> Email:</b> {user.email}

                </Card.Text>
                <Card.Text>

                    <b> Admin:</b>  {user.isAdmin ? 'YES' : 'NO'}
                </Card.Text>
            </Card.Body>
        </Card>
    },
    {
        key: "2",
        label: "Bookings",
        children: <MyBookings />
    },
    ]
    useEffect(() => {

        if (!user) {

            window.location.href = '/login'

        }


    }, [user])
    return (

        <div className='ms-3 mt-3'>
            <Tabs defaultActiveKey="1" items={items}>

            </Tabs>
        </div>
    )
}



export function MyBookings() {
    const user = JSON.parse(localStorage.getItem('currentUser'));

    const { data: bookings = [] } = useFetchData(() => getBookingsByUserId(user._id), [user._id]);
    const { data: bookingsAP = [] } = useFetchData(() => getApartmentBookingsByUserId(user._id), [user._id]);

    return (
        <>
            {bookings &&
                bookings.map((booking) => (
                    <div key={booking._id}>
                        <Card border="success" className='lg mx-3 mt-3 mb-5'>
                            <Card.Header><b>Room:{booking.room}</b></Card.Header>
                            <Card.Body>
                                <Card.Text><b>Booking ID</b>: {booking._id}</Card.Text>
                                <Card.Text>
                                    <b>CheckIn</b>: {booking.fromDate}
                                </Card.Text>
                                <Card.Text>
                                    <b>CheckOut</b>: {booking.toDate}
                                </Card.Text>
                                <Card.Text>
                                    <b>Amount</b>:  {booking.totalAmount} RON
                                </Card.Text>
                                <Card.Text>
                                    <b> Status </b>:  {booking.status === 'cancelled' ? (<Tag color="RED">CANCELLED</Tag>) : <Tag color="green">CONFIRMED</Tag>}
                                </Card.Text>
                                <Card.Text>
                                    {booking.status !== 'cancelled' && (

                                        <button className='btn btn-primary' onClick={() => { cancelBooking(booking._id, booking.roomID) }}>
                                            CANCEL BOOKING
                                        </button>

                                    )}
                                </Card.Text>

                            </Card.Body>
                        </Card>
                    </div>
                ))}
            {bookingsAP &&
                bookingsAP.map((booking) => (
                    <div key={booking._id}>
                        <Card border="success" className='lg mx-3 mt-3 mb-5' >
                            <Card.Header><b>Apartment: {booking.apartment}</b></Card.Header>
                            <Card.Body>
                                <Card.Text><b>Booking ID</b>: {booking._id}</Card.Text>
                                <Card.Text>
                                    <b>CheckIn</b>: {booking.fromDate}
                                </Card.Text>
                                <Card.Text>
                                    <b>CheckOut</b>: {booking.toDate}
                                </Card.Text>
                                <Card.Text>
                                    <b>Amount</b>:  {booking.totalAmount} RON
                                </Card.Text>
                                <Card.Text>
                                    <b> Status </b>:  {booking.status === 'cancelled' ? (<Tag color="RED">CANCELLED</Tag>) : <Tag color="green">CONFIRMED</Tag>}
                                </Card.Text>
                                <Card.Text>
                                    {booking.status !== 'cancelled' && (

                                        <button className='btn btn-primary' onClick={() => { cancelBookingApartment(booking._id, booking.apartmentID) }}>
                                            CANCEL BOOKING
                                        </button>

                                    )}
                                </Card.Text>

                            </Card.Body>
                        </Card>
                    </div>
                ))}
        </>
    );
}



export default Profile