import { Container, Image } from "react-bootstrap";
import IlustrationLogin from "../assets/Illustrasi-Login.png";

export const LandingImage = () => {
  return (
    <Container className="d-flex justify-content-center py-4">
      <Image
        src={IlustrationLogin}
        alt="Ilustrasi Login"
        style={{
          width: "100%",
          maxWidth: "600px",
          height: "auto",
          objectFit: "cover",
        }}
        fluid
      />
    </Container>
  );
};
