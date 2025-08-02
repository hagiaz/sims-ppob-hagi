import {
  Container,
  Form,
  Image,
  Row,
  Col,
  InputGroup,
  FormControl,
  Button,
  Alert,
} from "react-bootstrap";
import logo from "../assets/Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faLock,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUserAsync, loginUserAsync } from "../features/auth/AuthorizationThunks";
import { useNavigate } from "react-router-dom";
import { setAuthToken } from "../config/api";
import Swal from "sweetalert2";

export const FormRegister = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetFields = () => {
    setEmail("");
    setFirstName("");
    setLastName("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (confirmPassword !== password) {
      Swal.fire({
        icon: "error",
        title: "Gagal registrasi",
        text: "Konfirmasi password harus sama dengan password pertama",
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }

    dispatch(
      registerUserAsync({
        email,
        first_name: firstName,
        last_name: lastName,
        password: confirmPassword,
      })
    );

    resetFields();
  };

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUserAsync({ email, password })).then((action) => {
      if (loginUserAsync.fulfilled.match(action)) {
        const token = action.payload.data.token;
        localStorage.setItem("authToken", token);
        setAuthToken(token);
        navigate("/home");
      }
    });

    setEmail("");
    setPassword("");
  };

  return (
    <Container>
      <div className="text-center mt-3">
        <h4>
          <Image src={logo} alt="SIMS PPOB" /> SIMS PPOB
        </h4>
        <h4>
          {showLogin
            ? "Masuk atau buat akun untuk memulai"
            : "Lengkapi data untuk membuat akun"}
        </h4>
      </div>

      <div style={{ marginTop: "50px" }}>
        {/* Register Form */}
        <Form className={showLogin ? "d-none" : "d-block"} noValidate>
          <Row>
            <Form.Group as={Col} md={8} className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <InputGroup>
                <InputGroup.Text>@</InputGroup.Text>
                <Form.Control
                  type="email"
                  placeholder="Masukan email anda"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                />
              </InputGroup>
            </Form.Group>

            <Form.Group as={Col} md={8} className="mb-3" controlId="formFirstName">
              <Form.Label>Nama Depan</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faUser} />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Masukan nama depan"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </InputGroup>
            </Form.Group>

            <Form.Group as={Col} md={8} className="mb-3" controlId="formLastName">
              <Form.Label>Nama Belakang</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faUser} />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Masukan nama belakang"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </InputGroup>
            </Form.Group>

            <Form.Group as={Col} md={8} className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faLock} />
                </InputGroup.Text>
                <FormControl
                  type={showPassword ? "text" : "password"}
                  placeholder="Masukan password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={8}
                  required
                />
                <InputGroup.Text onClick={togglePasswordVisibility} style={{ cursor: "pointer" }}>
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>

            <Form.Group as={Col} md={8} controlId="formConfirmPassword">
              <Form.Label>Konfirmasi Password</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faLock} />
                </InputGroup.Text>
                <FormControl
                  type={showPassword ? "text" : "password"}
                  placeholder="Konfirmasi password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  minLength={8}
                  required
                />
                <InputGroup.Text onClick={togglePasswordVisibility} style={{ cursor: "pointer" }}>
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
          </Row>

          <div className="mt-4 text-center" style={{ width: "65%" }}>
            <Button variant="danger" className="w-100" onClick={handleSubmit}>
              Registrasi
            </Button>

            {users.status === "success" && (
              <Alert variant="success" className="mt-3">{users.message}</Alert>
            )}
            {users.status === "failed" && (
              <Alert variant="danger" className="mt-3">
                Registrasi gagal. {users.error}
              </Alert>
            )}

            <p className="mt-3">
              Sudah punya akun? login{" "}
              <span
                className="text-danger fw-bold"
                style={{ cursor: "pointer" }}
                onClick={() => setShowLogin(true)}
              >
                disini
              </span>
            </p>
          </div>
        </Form>

        {/* Login Form */}
        <Form className={showLogin ? "d-block" : "d-none"} noValidate>
          <Row>
            <Form.Group as={Col} md={8} className="mb-3" controlId="loginEmail">
              <Form.Label>Email</Form.Label>
              <InputGroup>
                <InputGroup.Text>@</InputGroup.Text>
                <Form.Control
                  type="email"
                  placeholder="Masukan email anda"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                />
              </InputGroup>
            </Form.Group>

            <Form.Group as={Col} md={8} className="mb-3" controlId="loginPassword">
              <Form.Label>Password</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faLock} />
                </InputGroup.Text>
                <FormControl
                  type={showPassword ? "text" : "password"}
                  placeholder="Masukan password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={8}
                  required
                />
                <InputGroup.Text onClick={togglePasswordVisibility} style={{ cursor: "pointer" }}>
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
          </Row>

          <div className="mt-3 text-center" style={{ width: "65%" }}>
            <Button variant="danger" className="w-100" onClick={handleLogin}>
              Masuk
            </Button>

            {users.status === "success" && (
              <Alert variant="success" className="mt-3">{users.message}</Alert>
            )}
            {users.status === "failed" && (
              <Alert variant="danger" className="mt-3">{users.error}</Alert>
            )}

            <p className="mt-3">
              Belum punya akun? registrasi{" "}
              <span
                className="text-danger fw-bold"
                style={{ cursor: "pointer" }}
                onClick={() => setShowLogin(false)}
              >
                disini
              </span>
            </p>
          </div>
        </Form>
      </div>
    </Container>
  );
};
