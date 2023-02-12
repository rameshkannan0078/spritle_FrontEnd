
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


function Navbar_Master() {
 
  const navigate=useNavigate();

  const PageNavigation = (pageUrl) =>{
    navigate(pageUrl)
  }

  const LogoutStudent = (e) =>{
    window.localStorage.removeItem('Master_Email');
    window.localStorage.removeItem('access_token');
    navigate('/');
  }

  
  return (
    <>
      <div>
        <Navbar bg="primary" expand="lg">
          <Container>
            <Navbar.Brand href="/masterpage" style={{ color: 'white' }}>
              <h3>Master</h3>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"  style={{ backgroundColor:'white' }} />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
              <Nav.Link href="/masterQuestionPosted" style={{ color: 'white' }}>
                 Questions Posted
                </Nav.Link>
                <Nav.Link href="/masterQustionAnswer" style={{ color: 'white' }}>
                Questions Answered
                </Nav.Link> 
                <Nav.Link href="/masterabout" style={{ color: 'white' }}>
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

export default Navbar_Master;
