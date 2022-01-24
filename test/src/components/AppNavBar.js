import React, { useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Navbar,
  Container,
  Nav,
  Form,
  FormControl,
  Col,
  Button,
  Row,
} from "react-bootstrap";
// import {
//   Collapse,
//   Navbar,
//   NavbarToggler,
//   NavbarBrand,
//   Nav,
//   NavItem,
//   NavLink,
//   Container,
// } from "reactstrap";
import LoginModal from "./auth/LoginModal";
import RegisterModal from "./auth/RegisterModal";
import { logout } from "../redux/actions/authActions";

function AppNavBar() {
  const isAuth = useSelector((state) => state.authReducer.isAuth);
  const user = useSelector((state) => state.authReducer.data);

  const dispatch = useDispatch();
  const guestLinks = (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="m-auto my-2 "
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link>Welcame</Nav.Link>
          </Nav>
          <Form>
            <Button variant="outline-success" className="me-2">
              <RegisterModal />
            </Button>
            <Button variant="outline-success" className="me-5">
              <LoginModal />
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
  const authLinks = (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand>
          <Link to="/">Home</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav.Link>
            <Link to="/items">SHOP</Link>
          </Nav.Link>
          <Nav
            className="m-auto my-2 "
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link>
              <Link to="/dashboard">
                {user ? `welcame  ${user.name}` : null}
              </Link>
            </Nav.Link>
          </Nav>
          <Form>
            <Button
              variant="outline-success"
              className="me-2"
              onClick={() => dispatch(logout())}
            >
              Logout
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
  return <div>{isAuth ? authLinks : guestLinks}</div>;
}

export default AppNavBar;
