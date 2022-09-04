import React from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
// import './style.css'

const Header = () => {
  const navigate = useNavigate();
  // const auth=localStorage.getItem('auth')
  
    const logoutHandler = () => {
      localStorage.removeItem('role');

      //----------------remove cookie----------
      axios.get(`http://localhost:3001/logout`).then(res => console.log(res))
        .then(err => console.log(err))
      
      navigate('/')
    }
  
  return (
    
        <Navbar bg="dark" variant="dark" sticky='top'>
            <Container>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">                    
                      {/* <Nav.Link as={Link} to="/settings">AdminDashboard</Nav.Link> */}
             
              <Nav.Link as={Link} to='/' className='btn btn-danger btn-lg text-white' onClick={logoutHandler}>Logout</Nav.Link>
            

                </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>
    
  )
}

export default Header