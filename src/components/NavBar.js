import React from 'react';
import { Image, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons';
function NavBar() {
  //const user = JSON.parse(localStorage.getItem('currentUser'));
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
  function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = '/login';
  }
  const isAdminFn = user && user.isAdmin;

  return (
    <Navbar expand="sm" className="bg-info mb-3">
      <Container fluid>
        <Image
          src="https://tiermaker.com/images/chart/chart/cosas-random-1168650/amoguspng.png"
          alt="Image"
          width={40}
          height={40}
          className='ms-5'
        />
        <Navbar.Brand href="/" className="text-white ml-3">Hotelsz</Navbar.Brand> {/* Added ml-3 class for left margin */}
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">

          <Nav.Item>
            <Nav.Link href="/apartments" className="text-black fw-bold ms-3">Apartments</Nav.Link> {/* Added ml-3 class for left margin */}
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/" className="text-black fw-bold ms-3">Rooms</Nav.Link> {/* Added ml-3 class for left margin */}
          </Nav.Item>

          <Nav className="ms-auto me-5">

            {user ? (
              <NavDropdown title={<><FontAwesomeIcon icon={faUser} className="me-2" />{user.first_name } {user.last_name}</>} id="basic-nav-dropdown" style={{ fontWeight: 'bold' }}>
                <Nav.Item>
                  <Nav.Link href="/profile" className=" ml-3">Profile</Nav.Link> {/* Added ml-3 class for left margin */}
                </Nav.Item>

                {
                  isAdminFn ?
                    <>
                      <NavDropdown.Divider />
                      <Nav.Item>
                        <Nav.Link href="/admin" className=" ml-3">Admin</Nav.Link> {/* Added ml-3 class for left margin */}
                      </Nav.Item>
                    </>
                    :
                    <></>
                }

                <NavDropdown.Divider />
                <NavDropdown.Item style={{ color: 'red', fontWeight: 'bold' }} onClick={logout}>Logout</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Nav.Item>
                  <Nav.Link href="/register" className="text-white ml-3">Register</Nav.Link> {/* Added ml-3 class for left margin */}
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link href="/login" className="text-white ml-3">Login</Nav.Link> {/* Added ml-3 class for left margin */}
                </Nav.Item>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
