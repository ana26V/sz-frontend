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

  let user = null;
  try {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      user = JSON.parse(currentUser);
    }
  } catch (error) {
    console.error('Error parsing user data:', error);
    // Handle the parsing error, such as clearing the localStorage or displaying an error message.
  }

  const isUserLoggedIn = !!user; 
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
               isUserLoggedIn ? ( // Check if the user is logged in
               roomAvailable ? (
                 <Link to={`/book/${apartment._id}/${fromDate}/${toDate}`}>
                   <button className='btn btn-primary'>Book now</button>
                 </Link>
               ) : (
                 <button className='btn btn-primary' disabled>Apartment taken</button>
               )
             ) : (
               <Link to={`/login`}> {/* Redirect to login if not logged in */}
                 <button className='btn btn-primary'>Login to book</button>
               </Link>
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
