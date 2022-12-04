import React from 'react'
import { BrowserRouter, Routes, Route,Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import {Home} from "./components/Home";
import {Admin} from "./components/Admin";
import {Rooms} from "./components/Rooms";
import {Signup} from "./components/Signup";
import {Signin} from "./components/Signin";

function App() {
  return (
    <BrowserRouter>
    <div classname="App">
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link as= {Link} to="/">Home</Nav.Link>
            <Nav.Link  as={Link} to ="/rooms">Rooms</Nav.Link>
            <Nav.Link as={Link} to ="/admin">Admin</Nav.Link>
            <Nav.Link as={Link} to ="/signup">Signup</Nav.Link>
             <Nav.Link as={Link} to ="/signin">Signin</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
    <div>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/rooms" element={<Rooms/>}/>
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/signin" element={<Signin/>}/>

        <Route path="/signup" element={<Signup/>}/>

      </Routes>
    </div>

    </div>
    </BrowserRouter>
  );
}

export default App;
