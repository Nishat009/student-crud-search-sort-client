import React from 'react';
import { Button, Form, FormControl, Navbar} from 'react-bootstrap';
import { Link } from 'react-router-dom';
const Header = () => {

    return (
        <div>
            <Navbar bg="success" expand="lg">
            
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse className="justify-content-middle ">
              
                <Link className="text-light nav-link" to="/addStudent">Add Student</Link>  
                <Link  className="text-light nav-link" to="/manageStudent">Manage Student</Link>
               
            </Navbar.Collapse>
            
            </Navbar>
        </div>
    );
};

export default Header;