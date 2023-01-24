import React, { useEffect } from "react";
import { Container, Form, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link ,useNavigate} from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { logout } from "../../actions/userActions";

const Header = ({setSearch}) => {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const userLogin=useSelector(state=>state.userLogin);
  const {userInfo}=userLogin;
  useEffect(()=>{},[userInfo]);
  const logoutHandler=()=>{
    dispatch(logout());
    navigate("/");

  }
  return (
    <Navbar bg="primary" expand="lg" variant="dark">
      <Container>
        <Navbar.Brand>
          <Link to="/">Notezipper</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        {userInfo ?      (   <Navbar.Collapse id="navbarScroll">
          <Nav className="m-auto">
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={e=>setSearch(e.target.value)}
              />
            </Form>
          </Nav>
          <Nav
            className="my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link>
              <Link to="/mynotes"> My Notes</Link>
            </Nav.Link>
            <NavDropdown title={ userInfo.name} id="navbarScrollingDropdown">
              <NavDropdown.Item href="/myprofile">My Profile</NavDropdown.Item>
              <NavDropdown.Item
                onClick={logoutHandler}
              >
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>):(<Nav.Link>
              <Link to="/login" style={{color:"white"}}> Login</Link>
              
            </Nav.Link>)}
      </Container>
    </Navbar>
  );
};

export default Header;
