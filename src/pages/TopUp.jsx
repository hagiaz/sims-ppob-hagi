import React, { useEffect, useState } from "react";
import { Container, Form, InputGroup, Col, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { TopUpAsync } from "../features/transaction/TransactionThunks";
import { formatRupiah } from "../utils/format";
import Swal from "sweetalert2";
import { Navigationbar } from "../components/Navbar";
import ProfileComponent from "../components/ProfileComponent";

const TopUpPage = () => {
  const dispatch = useDispatch();
  const [saldo, setSaldo] = useState("");
  const [isFormEmpty, setIsFormEmpty] = useState(true);

  useEffect(() => {
    setIsFormEmpty(saldo === "");
  }, [saldo]);

  const handleSaldoChange = (value) => {
    setSaldo(value);
    setIsFormEmpty(value === "");
  };

  const handleTopUp = (e) => {
    e.preventDefault();
    const nominal = parseInt(saldo);
    if (nominal < 10000 || nominal > 1000000) {
      Swal.fire({
        icon: "error",
        title: "Gagal Top Up",
        text: "Minimal top up Rp10.000 dan maksimal Rp1.000.000",
        confirmButtonColor: "red",
      });
      return;
    }

    dispatch(TopUpAsync({ top_up_amount: nominal }));
    setSaldo("");
    Swal.fire({
      icon: "success",
      title: `Berhasil Top Up sejumlah ${formatRupiah(nominal)}`,
      timer: 2000,
      showConfirmButton: false,
    });
  };

  return (
    <>
      <Navigationbar />
      <Container className="py-4">
        <ProfileComponent />

        <div className="mt-5 ms-3">
          <p className="fw-medium">Silahkan Masukkan</p>
          <p className="fw-bold fs-3">Nominal Top Up</p>

          <Form onSubmit={handleTopUp}>
            <Form.Group as={Col} md={5} className="mb-3" controlId="topupAmount">
              <InputGroup>
                <InputGroup.Text>RP</InputGroup.Text>
                <Form.Control
                  type="number"
                  placeholder="Masukkan nominal"
                  value={saldo}
                  onChange={(e) => handleSaldoChange(e.target.value)}
                  required
                />
              </InputGroup>
            </Form.Group>

            <Button
              type="submit"
              className="col-md-5"
              variant={isFormEmpty ? "secondary" : "danger"}
              disabled={isFormEmpty}
            >
              Bayar
            </Button>
          </Form>
        </div>
      </Container>
    </>
  );
};

export default TopUpPage;
