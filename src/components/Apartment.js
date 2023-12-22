import React from 'react';
import { Link } from 'react-router-dom';
import { isValidDateFormat } from '../utils/utils';
import Room from './Room';
import Card from 'react-bootstrap/Card';
import { Button, Col, Row } from 'react-bootstrap';

const RoomCard = ({ room }) => {
  return (
    <Card className="text-center mb-3 mx-3">
      <Card.Img variant="top" height={200} width={200} src={room.image_urls[0]} />
      <Card.Body>
        <Card.Title>Room: {room.room_number}</Card.Title>
        <Card.Text>
          {/* Add room-specific details */}
          {/* Example: {room.details} */}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

function Apartment({ apartment, fromDate, toDate }) {

    console.log(apartment.current_bookings)

  const isRoomTaken = () => {
    //CHANGE HERRE
    if (!apartment || !apartment.current_bookings || !fromDate || !toDate) {
      return false;
    }

    const checkFromDate = new Date(fromDate.split('-').reverse().join('-')); // Reformat fromDate to YYYY-MM-DD
    const checkToDate = new Date(toDate.split('-').reverse().join('-')); // Reformat toDate to YYYY-MM-DD

    for (const booking of apartment.current_bookings) {
      const bookingFromDate = new Date(booking.fromDate.split('-').reverse().join('-')); // Reformat booking.fromDate to YYYY-MM-DD
      const bookingToDate = new Date(booking.toDate.split('-').reverse().join('-')); // Reformat booking.toDate to YYYY-MM-DD

      if (
        (checkFromDate <= bookingToDate && checkFromDate >= bookingFromDate) ||
        (checkToDate >= bookingFromDate && checkToDate <= bookingToDate) ||
        (checkFromDate <= bookingFromDate && checkToDate >= bookingToDate)
      ) {
        return true; // Room is taken during the provided date range
      }
    }

    return false; // Room is available for the provided date range
  };

  const hasImages = apartment && apartment.roomID.image_urls && apartment.roomID.image_urls.length > 0;
  //const roomAvailable = !isRoomTaken(); // Check if the room is available
  const roomAvailable =true;
  return (

    <Card className="text-center">
    <Card.Header style={{ padding: 25, fontWeight: 'bold' }}>Apartment {apartment.name}</Card.Header>
    <Row xs={1} md={2} className="g-4 justify-content-center mt-1 mb-1 ">
      {apartment.roomID.map((room, idx) => (
        <Col key={idx} className="d-flex justify-content-center ">
          <RoomCard room={room} />
          
        </Col>
      ))}
    </Row>
    <Card.Footer className="text-muted">
      
    {(isValidDateFormat(fromDate) && isValidDateFormat(toDate)) ? (
               //COME BACK HERE AND CHANGE
               roomAvailable ? (
                  <Link to={`/bookAP/${apartment._id}/${fromDate}/${toDate}`}>
                    <button className='btn btn-primary'>Book now</button>
                  </Link>
                ) : (
                  <button className='btn btn-primary' disabled>Room taken</button>
                )
              ) : (
                <Link to={`/`}>
                  <button className='btn btn-danger' disabled>Select date first!</button>
                </Link>
              )}
    </Card.Footer>
  </Card>
  );
}

export default Apartment;
