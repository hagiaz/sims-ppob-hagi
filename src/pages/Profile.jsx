import { Container, Form, Image, InputGroup, Col, Button } from "react-bootstrap";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TransactioAsync, fetchBalance, fetchServices } from "../features/profile/ProfilThunks";
import { useParams } from "react-router-dom";
import { formatRupiah } from "../utils/format";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyCheckDollar } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import { Navigationbar } from "../components/Navbar";
import ProfileComponent from "../components/ProfileComponent";

export const Profile = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const services = useSelector((state) => state.profile.services);
  const selectedService = services?.[id];

  useEffect(() => {
    dispatch(fetchServices());
    dispatch(fetchBalance());
  }, [dispatch]);

  const handleTransaction = (e) => {
    e.preventDefault();
    const serviceCode = selectedService?.service_code;
    if (!serviceCode) return;

    dispatch(TransactioAsync({ service_code: serviceCode })).then((result) => {
      if (result?.type === "profile/transaction/rejected") {
        Swal.fire({
          icon: "error",
          title: `Gagal membayar ${selectedService?.service_name}`,
          text: "Saldo tidak mencukupi, silahkan Top Up",
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        Swal.fire({
          icon: "success",
          title: `Berhasil membayar ${selectedService?.service_name}`,
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  if (!selectedService) return null; // atau tampilkan loading

  return (
    <>
      <Navigationbar />
      <Container className="py-4">
        <ProfileComponent />

        <div className="mt-4">
          <h5 className="fw-semibold">Pembayaran</h5>
          <p className="fw-bold d-flex align-items-center gap-2">
            <Image src={selectedService?.service_icon} alt="icon" height={30} />
            {selectedService?.service_name}
          </p>

          <Form onSubmit={handleTransaction}>
            <Form.Group as={Col} md={6} className="mb-3" controlId="serviceCode">
              <InputGroup>
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faMoneyCheckDollar} />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder={formatRupiah(selectedService?.service_tariff)}
                  value={selectedService?.service_code}
                  disabled
                />
              </InputGroup>
            </Form.Group>
            <Button type="submit" variant="danger" className="w-100">
              Bayar
            </Button>
          </Form>
        </div>
      </Container>
    </>
  );
};
