import React, { useEffect, useState } from "react";
import profile from "../assets/Profile.png";
import { Col, Form, Image, InputGroup, Row, Button, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faUser } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile, editProfileAsync, editProfileImageAsync } from "../features/profile/ProfilThunks";
import { setAuthToken } from "../config/api";
import { useNavigate } from "react-router-dom";
import { Navigationbar } from "../components/Navbar";
import Swal from "sweetalert2";

const ProfileEdit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profiles = useSelector((state) => state.profile.data);

  const [inputDisabled, setInputDisabled] = useState(true);
  const [editButtonText, setEditButtonText] = useState("Edit Profil");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleEditProfile = () => {
    if (inputDisabled) {
      setInputDisabled(false);
      setEditButtonText("Simpan");
    } else {
      setInputDisabled(true);
      setEditButtonText("Edit Profil");
      dispatch(editProfileAsync({ first_name: firstName, last_name: lastName }));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setAuthToken(null);
    navigate("/");
  };

  const allowedImageTypes = ["image/jpeg", "image/jpg", "image/png"];
  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.size <= 100 * 1024 && allowedImageTypes.includes(file.type)) {
      const formData = new FormData();
      formData.append("file", file);
      dispatch(editProfileImageAsync(formData));
      Swal.fire({
        icon: "success",
        title: "Sukses Mengubah Foto",
        timer: 1500,
        showConfirmButton: false,
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Gagal Mengubah Foto",
        text: `Maksimal ukuran 100 KB`,
        confirmButtonColor: "red",
      });
    }
  };

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profiles) {
      setFirstName(profiles?.first_name || "");
      setLastName(profiles?.last_name || "");
    }
  }, [profiles]);

  const profileImage =
    profiles?.profile_image === "https://minio.nutech-integrasi.app/take-home-test/null"
      ? profile
      : profiles?.profile_image;

  return (
    <>
      <Navigationbar />
      <Container className="py-4">
        <div className="text-center mb-4">
          <Image src={profileImage} alt="Profile" roundedCircle width={120} height={120} />
          <div className="mt-2">
            <label htmlFor="imageInput" className="text-primary" style={{ cursor: "pointer" }}>
              <FontAwesomeIcon icon={faEdit} /> Ubah Foto
            </label>
            <input
              type="file"
              id="imageInput"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
          </div>
          <p className="fs-4 fw-semibold mt-3">
            {profiles?.first_name} {profiles?.last_name}
          </p>
        </div>

        <Form>
          <Row className="justify-content-center">
            <Form.Group as={Col} md={8} className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <InputGroup>
                <InputGroup.Text>@</InputGroup.Text>
                <Form.Control type="email" value={profiles?.email} disabled readOnly />
              </InputGroup>
            </Form.Group>

            <Form.Group as={Col} md={8} className="mb-3" controlId="firstName">
              <Form.Label>Nama Depan</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faUser} />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  disabled={inputDisabled}
                />
              </InputGroup>
            </Form.Group>

            <Form.Group as={Col} md={8} className="mb-3" controlId="lastName">
              <Form.Label>Nama Belakang</Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faUser} />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  disabled={inputDisabled}
                />
              </InputGroup>
            </Form.Group>

            <Col md={8} className="mb-3 d-grid gap-2">
              <Button variant="danger" onClick={handleEditProfile}>
                {editButtonText}
              </Button>
              {editButtonText === "Edit Profil" && (
                <Button variant="outline-danger" onClick={handleLogout}>
                  Logout
                </Button>
              )}
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  );
};

export default ProfileEdit;
