import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFetchData } from '../hooks/useData';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import Swal from 'sweetalert2';
import Footer from '../components/Footer'
import { calculateAmountAP, calculateDaysBetweenDates } from '../utils/utils';
import { getApartmentByID } from '../services/apartments';
const ApBookings = () => {
    const [totalAmount,setTotalAmount]=useState(1);
    const { apartmentId, fromDate, toDate } = useParams();
    const { error, loading, data: apartment = [] } = useFetchData(() => getApartmentByID(apartmentId), [apartmentId]);
    const [numberOfPeople, setNumberOfPeople] = useState(1); // State to store the number of people for booking
    const currentUser=JSON.parse(localStorage.getItem('currentUser'));
    //const { data: inventoryByID = [] } = useFetchData(() => getInventoryByID(apartment.roomID?.inventoryID), [apartment]);
    const totalDays = calculateDaysBetweenDates(fromDate, toDate);
   
    const handleNumberOfPeopleChange = (e) => {
        setNumberOfPeople(parseInt(e.target.value, 10)); // Parsing the selected value to an integer
    };
    //const totalAmount=totalDays*room.rentperday;
    //UPDATE LOGIC HERE
    useEffect(() => {
        const newTotalAmount = calculateAmountAP(totalDays, numberOfPeople);
        setTotalAmount(newTotalAmount);
    }, [totalDays, numberOfPeople]);

  
    //const { inventoryID } = room;

    // useEffect(() => {
    //     if (inventoryID) {
    //         getInventoryByID(inventoryID)
    //             .then((response) => {
    //                 const inventoryData = response.data;
    //                 console.log("Inventory Data:", inventoryData);
    //                 // Set the fetched inventory data to state or use it as needed
    //             })
    //             .catch((error) => {
    //                 console.error("Error fetching inventory details:", error);
    //             });
    //     }
    // }, [inventoryID]);

    async function onToken(token) {
        const bookingDetails = {
            apartment,
            // user: JSON.parse(localStorage.getItem('currentUser'))
            userID: currentUser._id,
            fromDate,
            toDate,
            totalAmount,
            totalDays,
            token
        }
        try {
            const result = await axios.post('/api/bookingsAP/bookApartment', bookingDetails)
            Swal.fire('Congratulations', 'Room Booked Successfully', 'success').then(result => {
                window.location.href = '/profile'
            })
        } catch (error) {
            Swal.fire('Ooops..', 'Something went Wrong', error)
        }
    }
    // const { inventoryID } = room;
    // console.log(inventoryID)
    return (
        <>
            <div className="container ">
                <div className="row justify-content-center">
                    <div className="col-md-8 border p-4 rounded">

                        <div className="room-details">
                            <h2>Apartment: {apartment.name}</h2>
                            
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center mt-4">
                    <div className="col-md-8 border p-4 rounded">
                        <h2 className="text-center mb-5">Booking Details</h2>
                        <p><strong>Booked by: </strong> {currentUser.first_name} {currentUser.last_name}</p>
                        <p><strong>From: </strong> {fromDate}</p>
                        <p><strong>To: </strong>  {toDate}</p>
                    </div>
                </div>
                <div className="row justify-content-center mt-4">
                    <div className="col-md-8 border p-4 rounded">
                        <h2 className="text-center">Amount</h2>
                        <p><strong>Total Days:</strong> {totalDays} days </p>
                        <p><strong>Number of People: </strong></p>
                       
                       <select value={numberOfPeople} onChange={handleNumberOfPeopleChange} className="form-select mb-3">
                           <option value={1}>1 person</option>
                           <option value={2}>2 people</option>
                           <option value={3}>3 people</option>
                           {/* Add more options as needed */}
                       </select>
                        <p><strong>Total Amount:</strong> {totalAmount} RON</p>

                        <StripeCheckout
                            amount={totalAmount*100}
                            token={onToken}
                            currency='RON'
                            stripeKey="pk_test_51ODvUNGOWeco0QiyCAegwEImVhO0fIGtBCz0NMMCoeB3Du9QvnBxpAqlRIG201NyYjatKGNuiz0Xd8n5OXmANpqm009DuRlQPC">

                            <button className="btn btn-primary"
                            //onClick={bookRoom}
                            >
                                Pay Now
                            </button>
                        </StripeCheckout>
                        <StripeCheckout
                            amount={totalAmount*10}
                            token={onToken}
                            currency='RON'
                            stripeKey="pk_test_51ODvUNGOWeco0QiyCAegwEImVhO0fIGtBCz0NMMCoeB3Du9QvnBxpAqlRIG201NyYjatKGNuiz0Xd8n5OXmANpqm009DuRlQPC">

                            <button className="btn btn-primary mx-3"
                            //onClick={bookRoom}
                            >
                                Advance only
                            </button>
                        </StripeCheckout>

                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ApBookings;
