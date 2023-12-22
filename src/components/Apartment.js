import React from 'react';
import { Link } from 'react-router-dom';
import { isValidDateFormat } from '../utils/utils';
import Card from 'react-bootstrap/Card';
import { Col, Row } from 'react-bootstrap';

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
