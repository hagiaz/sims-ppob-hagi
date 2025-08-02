import { LandingImage } from "../components/LandingImage";
import { FormRegister } from "../components/InputForm";
import { Col, Container, Row } from "react-bootstrap";

export const LandingPage = () => {
  return (
    <section style={{ minHeight: "100vh", paddingTop: "40px", paddingBottom: "40px" }}>
      <Container>
        <Row className="justify-content-center align-items-center">
          <Col md={6} className="mb-4 mb-md-0">
            <FormRegister />
          </Col>
          <Col md={6}>
            <LandingImage />
          </Col>
        </Row>
      </Container>
    </section>
  );
};
