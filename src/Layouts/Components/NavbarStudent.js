import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


function Navbar_Student() {
 
  const navigate=useNavigate();

  const PageNavigation = (pageUrl) =>{
    navigate(pageUrl)
  }

  const LogoutStudent = (e) =>{
    window.localStorage.removeItem('Student_Email');
    window.localStorage.removeItem('access_token');
    navigate('/');
  }

  
  return (
    <>
      <div>
        <Navbar bg="dark" expand="lg">
          <Container>
            <Navbar.Brand href="/studentpage" style={{ color: 'white' }}>
              Student
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"  style={{ backgroundColor:'white' }} />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/studentpage" style={{ color: 'white' }}>
                  Home
                </Nav.Link>
                <Nav.Link href="/studentdashboard" style={{ color: 'white' }}>
                  Dashboard
                </Nav.Link>
                <Nav.Link href="/studentabout" style={{ color: 'white' }}>
                  About
                </Nav.Link>
              
              </Nav>
              <Button variant='danger' onClick={LogoutStudent}>
              Log Out
              </Button>

                          </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </>
  );
}

export default Navbar_Student;
