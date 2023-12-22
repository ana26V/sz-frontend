import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import Dropdown from 'react-bootstrap/Dropdown';
import { useFetchData } from "../hooks/useData";
import { getAllApartmentBookings, getAllBookings } from "../services/bookings";
import { Table } from "react-bootstrap";
import { getallrooms } from "../services/rooms";
import { getAllUsers } from "../services/auth";
import { calculateTotalAmountPerMonth, calculateTotalCostPerMonth, getBookingsForMonth, getMonthNumberByName, months } from "../utils/utils";
import { getAllApartments } from "../services/apartments";

function AdminScreen() {

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem('currentUser')).isAdmin)
      window.location.href = '/'
  }, []);
  const items = [{
    key: "1",
    label: "Room Bookings",
    children: <BookingsAdmin />
  },
  {
    key: "2",
    label: "Apartment Bookings",
    children: <ApartmentBookingsAdmin />
  },
  {
    key: "3",
    label: "Rooms",
    children: <RoomsTable />
  },
  {
    key: "19",
    label: "Apartments",
    children: <ApartmentsTable />
  },

  {
    key: "4",
    label: "Users",
    children: <UsersTable />
  },
  {
    key: "5",
    label: "Finances",
    children: <Finance />
  },
  ]
  return (
    <div className='mt-3 mx-5 '>
      <h2 className='text-center' style={{ fontSize: '30px' }}><b>Admin Panel</b></h2>

      <Tabs defaultActiveKey="1" items={items}>

      </Tabs>
    </div>
  );
}
export function BookingsAdmin() {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [filteredBookings, setFilteredBookings] = useState([]);
 
  const { data: bookings = [] } = useFetchData(() => getAllBookings());

  
  const [selectedDate, setSelectedDate] = useState('');
 
  const handleMonthSelect = (selected) => {
    setSelectedMonth(selected);
    const monthNumber = getMonthNumberByName(selected); // Use your own function to get month number by name
    const filtered = getBookingsForMonth(bookings, monthNumber);
    setFilteredBookings(filtered);
  };

  const handleDateSelect = (selected) => {
    setSelectedDate(selected);

    // Filter bookings for the selected date
    const filtered = bookings.filter(
      (booking) => booking.fromDate === selected || booking.toDate === selected
    );
    setFilteredBookings(filtered);
    
  };

   
  return (
    <>
      <div className="row">
        <div className="col-md-10">

          {bookings.length && <h1>There are total {bookings.length} bookings</h1>}

          <div>
            <h1>Bookings</h1>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Room</th>
                  <th>User ID</th>
                  <th>From Date</th>
                  <th>To Date</th>
                  <th>Total Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking, index) => (
                  <tr key={index}>
                    <td>{booking.room}</td>
                    <td>{booking.userID}</td>
                    
                    <td>{booking.fromDate}</td>
                    <td>{booking.toDate}</td>
                    <td>{booking.totalAmount}</td>
                    <td>{booking.status}</td>
                  </tr>
                ))}

              </tbody>
            </Table>
          </div>
        </div>
        <Dropdown className="mt-5 mb-3">
          <Dropdown.Toggle variant="info" id="dropdown-month">
            {selectedMonth ? selectedMonth : 'Select Month'}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {Array.from({ length: 12 }, (_, index) => (
              <Dropdown.Item key={index} onClick={() => handleMonthSelect(months[index])}>
                {months[index]}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <div>
          <h1>Bookings for {selectedMonth}</h1>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Room</th>
                <th>User ID</th>
                <th>From Date</th>
                <th>To Date</th>
                <th>Total Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking, index) => (
                <tr key={index}>
                  <td>{booking.room}</td>
                  <td>{booking.userID}</td>
                  <td>{booking.fromDate}</td>
                  <td>{booking.toDate}</td>
                  <td>{booking.totalAmount}</td>
                  <td>{booking.status}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>








      <Dropdown className="mt-5 mb-3">
        <Dropdown.Toggle variant="info" id="dropdown-date">
          {selectedDate ? selectedDate : 'Select Date'}
        </Dropdown.Toggle>

        <Dropdown.Menu>
        
          {bookings.map((b, index) => (
            <Dropdown.Item key={index} onClick={() => handleDateSelect(b.fromDate)}>
              {b.fromDate}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      <div>
        <h1>Bookings for {selectedDate}</h1>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Room</th>
              <th>User ID</th>
              <th>From Date</th>
              <th>To Date</th>
              <th>Total Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((booking, index) => (
              <tr key={index}>
               
                <td>{booking.room}</td>
                <td>
                 {booking.userID}
                </td>
                <td>{booking.fromDate}</td>
                <td>{booking.toDate}</td>
                <td>{booking.totalAmount}</td>
                <td>{booking.status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
     
    </>
  );
}



function ApartmentBookingsAdmin() {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [filteredBookings, setFilteredBookings] = useState([]);
  const { data: bookings = [] } = useFetchData(() => getAllApartmentBookings());

  const handleMonthSelect = (selected) => {
    setSelectedMonth(selected);
    const monthNumber = getMonthNumberByName(selected); // Use your own function to get month number by name
    const filtered = getBookingsForMonth(bookings, monthNumber);
    setFilteredBookings(filtered);
  };

  return (
    <>
      <div className="row">
        <div className="col-md-10">

          {bookings.length && <h1>There are total {bookings.length} bookings</h1>}

          <div>
            <h1>Bookings</h1>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Apartment</th>
                  <th>User ID</th>
                  <th>From Date</th>
                  <th>To Date</th>
                  <th>Total Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking, index) => (
                  <tr key={index}>
                    <td>{booking.apartment}</td>
                    <td>{booking.userID}</td>
                    <td>{booking.fromDate}</td>
                    <td>{booking.toDate}</td>
                    <td>{booking.totalAmount}</td>
                    <td>{booking.status}</td>
                  </tr>
                ))}

              </tbody>
            </Table>
          </div>
        </div>
        <Dropdown className="mt-5 mb-3">
          <Dropdown.Toggle variant="info" id="dropdown-month">
            {selectedMonth ? selectedMonth : 'Select Month'}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {Array.from({ length: 12 }, (_, index) => (
              <Dropdown.Item key={index} onClick={() => handleMonthSelect(months[index])}>
                {months[index]}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <div>
          <h1>Bookings for {selectedMonth}</h1>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Apartment</th>
                <th>User ID</th>
                <th>From Date</th>
                <th>To Date</th>
                <th>Total Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking, index) => (
                <tr key={index}>
                  <td>{booking.apartment}</td>
                  <td>{booking.userID}</td>
                  <td>{booking.fromDate}</td>
                  <td>{booking.toDate}</td>
                  <td>{booking.totalAmount}</td>
                  <td>{booking.status}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>

    </>
  );
}


function RoomsTable() {

  const { data: rooms = [] } = useFetchData(() => getallrooms());

  return (
    <div>
      <h1>Rooms</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Room Number</th>
            <th>Number of Beds</th>
            <th>Inventory</th>
            <th>Facilities</th>
            <th>Supplies</th>


          </tr>
        </thead>
        <tbody>
          {rooms.map((room, index) => (
            <tr key={index}>
              <td>{room.room_number}</td>
              <td>{room.number_of_beds}</td>

              <td>
                <ul>
                  {room.inventoryID.map((inventoryItem, index) => (
                    <li key={index}>
                      <b>Name:</b> {inventoryItem.name}, <b>Quantity:</b> {inventoryItem.quantity}
                    </li>
                  ))}
                </ul>
              </td>
              <td>
                <ul>
                  {room.facilitiesID.map((i, index) => (
                    <li key={index}>
                      <b>Name:</b> {i.name}, <b>Quantity:</b> {i.quantity}
                    </li>
                  ))}
                </ul>
              </td>
              <td>
                <ul>
                  {room.suppliesID.map((i, index) => (
                    <li key={index}>
                      <b>Name:</b> {i.name}, <b>Quantity:</b> {i.quantity}
                    </li>
                  ))}
                </ul>
              </td>


            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}




function ApartmentsTable() {

  const { data: apartments = [] } = useFetchData(() => getAllApartments());
  // apartments.map(ap=>
  //   ap.roomID.map(r=>
  //     r.inventoryID.map(i=> console.log(i))
  //     )
  // )
  return (
    <div>
      <h1>Apartments</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Apartment Name</th>
            <th>Rooms</th>
           
          </tr>
        </thead>
        <tbody>
          {apartments.map((apartment, index) => (

            <tr key={index}>
              <td>{apartment.name}</td>

              <td>
                {apartment.roomID.map((r, index) => (
                  <div key={index}>
                   
                   
                   Room:<strong> {r.room_number}</strong> 
                      
                  </div>
                ))}

              </td>


              {/* <td>
                <ul>
                  {apartment.roomID.inventoryID.map((inventoryItem, index) => (
                    <li key={index}>
                      <b>Name:</b> {inventoryItem.name}, <b>Quantity:</b> {inventoryItem.quantity}
                    </li>
                  ))}
                </ul>
              </td>
              <td>
                <ul>
                  {apartment.roomID.facilitiesID.map((i, index) => (
                    <li key={index}>
                      <b>Name:</b> {i.name}, <b>Quantity:</b> {i.quantity}
                    </li>
                  ))}
                </ul>
              </td>
              <td>
                <ul>
                  {apartment.roomID.suppliesID.map((i, index) => (
                    <li key={index}>
                      <b>Name:</b> {i.name}, <b>Quantity:</b> {i.quantity}
                    </li>
                  ))}
                </ul>
              </td> */}


            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

function UsersTable() {

  const { data: users = [] } = useFetchData(() => getAllUsers());
  //const { data: one_user = [] } = useFetchData(() =>getUserByID('657331ddf9bce6880ba224d9'));
  
 // console.log(one_user)
  return (
    <div>
      <h1>Users</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>CNP</th>
            <th>Address</th>
            <th>Email</th>
            <th>Password</th>
            <th>Is Admin</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.first_name} {user.last_name}</td>
              <td>{user.CNP}</td>
              <td>{user.address}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>{user.isAdmin ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}


// const AddRoomForm = () => {
//   //const [roomNumber, setRoomNumber] = useState(0);

//   return (

//     <>
//       <div className="input-group mb-3">
//         <input type="text" className="form-control" placeholder="Room number" aria-label="Room number" aria-describedby="basic-addon2" />

//       </div>
//       <Button variant="primary">
//         Add Room
//       </Button>

//     </>
//   );
// };
const Finance = () => {
  const { loading, error, data: bookings = [] } = useFetchData(() => getAllBookings());

  const monthlyTotal = [];
  const monthlyTotalCost = [];

  for (let i = 0; i < months.length; i++) {
    const totalAmount = calculateTotalAmountPerMonth(bookings, i + 1);
    monthlyTotal.push({ month: months[i], totalAmount });
  }

  for (let i = 0; i < months.length; i++) {
    const totalAmount = calculateTotalCostPerMonth(bookings, i + 1);
    monthlyTotalCost.push({ month: months[i], totalAmount });
  }
  if (loading || !bookings) {
    return <div>Loading data....</div>;
  }

  if (error) {
    return <div>Error  fetching data</div>;
  }


  return (

    <div>
      <h3>Total Profit per Month</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Month</th>
            <th>Total Amount</th>

          </tr>
        </thead>
        <tbody>
          {monthlyTotal.map((item, index) => (
            <tr key={index}>
              <td>{item.month}</td>
              <td>{item.totalAmount}</td>

            </tr>
          ))}
        </tbody>
      </Table>

      <h3>Total Cost per Month</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Month</th>
            <th>Total Amount</th>

          </tr>
        </thead>
        <tbody>
          {monthlyTotalCost.map((item, index) => (
            <tr key={index}>
              <td>{item.month}</td>
              <td>{item.totalAmount}</td>

            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
export default AdminScreen;
