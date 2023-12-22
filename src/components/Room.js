import React, { useState } from 'react';
import { Modal, Button, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { isValidDateFormat } from '../utils/utils';

function Room({ room, fromDate, toDate }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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
  const isRoomTaken = () => {
    if (!room || !room.current_bookings || !fromDate || !toDate) {
      return false;
    }

    const checkFromDate = new Date(fromDate.split('-').reverse().join('-')); // Reformat fromDate to YYYY-MM-DD
    const checkToDate = new Date(toDate.split('-').reverse().join('-')); // Reformat toDate to YYYY-MM-DD

    for (const booking of room.current_bookings) {
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

  const hasImages = room && room.image_urls && room.image_urls.length > 0;
  const roomAvailable = !isRoomTaken(); // Check if the room is available
  const isUserLoggedIn = !!user; 
  return (
    <div className="row bs">
      <div className="col-md-4">
        {hasImages ? (
          <img src={room.image_urls[0]} alt="room" className="smallimg" />
        ) : (
          <p>No images available</p>
        )}
      </div>
      <div className="col-md-7">
        {room && (
          <>
            <h1>{room.name}</h1>
            <b>
              <p>Room number: {room.room_number}</p>
              <p>Number of beds: {room.number_of_beds}</p>
              <p>Taken: {isRoomTaken() ? 'yes' : 'no'}</p>
            </b>
            <div style={{ float: 'right' }}>
            {(isValidDateFormat(fromDate) && isValidDateFormat(toDate)) ? (
            isUserLoggedIn ? ( // Check if the user is logged in
              roomAvailable ? (
                <Link to={`/book/${room._id}/${fromDate}/${toDate}`}>
                  <button className='btn btn-primary'>Book now</button>
                </Link>
              ) : (
                <button className='btn btn-primary' disabled>Room taken</button>
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

              <button className="btn btn-primary mx-3" onClick={handleShow}>
                View Details
              </button>
            </div>
          </>
        )}

        <Modal show={show} onHide={handleClose} size="lg">
          {room && (
            <>
              <Modal.Header closeButton>
                <Modal.Title>Room: {room.room_number}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Carousel prevLabel="" nextLabel="">
                  {hasImages &&
                    room.image_urls.map((url, index) => (
                      <Carousel.Item key={index}>
                        <img className="d-block w-100 bigimg" src={url} alt="brokenimage" />
                      </Carousel.Item>
                    ))}
                </Carousel>
                
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </>
          )}
        </Modal>
      </div>
    </div>
  );
}

export default Room;
