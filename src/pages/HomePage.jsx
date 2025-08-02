import { Container } from "react-bootstrap";
import { Services } from "../components/Services";
import Banner from "../components/HomeBanner";
import { Navigationbar } from "../components/Navbar";
import ProfileComponent from "../components/ProfileComponent";
import Footer from "../components/HomeFooter";

export const HomePage = () => {
  return (
    <>
      <Navigationbar />
      <Container className="py-4">
        <ProfileComponent />

        <div className="my-4">
          <Services />
        </div>

        <h5 className="fw-semibold mt-5 mb-3">Temukan promo menarik</h5>
        <div className="mb-5">
          <Banner />
        </div>
      </Container>
      <Footer />
    </>
  );
};
