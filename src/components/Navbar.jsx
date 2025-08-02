import { Container, Image, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import logo from "../assets/Logo.png";

export const Navigationbar = () => {
  return (
    <Navbar variant="light" expand="md" className="py-3 shadow-sm">
      <Container>
        <Navbar.Brand as={NavLink} to="/home" className="d-flex align-items-center">
          <Image src={logo} alt="logo" height="40" />
          <span className="ms-2 fw-bold text-dark">SIMS PPOB</span>
        </Navbar.Brand>
        <Nav className="ms-auto gap-3">
          <Nav.Link as={NavLink} to="/top-up" className="text-dark">
            TOP UP
          </Nav.Link>
          <Nav.Link as={NavLink} to="/list-transaction" className="text-dark">
            TRANSACTION
          </Nav.Link>
          <Nav.Link as={NavLink} to="/myprofile" className="text-dark">
            AKUN
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};
