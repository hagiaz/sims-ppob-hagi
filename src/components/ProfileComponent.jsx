import React, { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchBalance, fetchProfile } from "../features/profile/ProfilThunks";
import { formatRupiah } from "../utils/format";
import defaultProfile from "../assets/Profile.png";
import bgImage from "../assets/Background.png";

const ProfileComponent = () => {
  const dispatch = useDispatch();
  const profiles = useSelector((state) => state.profile.data);
  const balance = useSelector((state) => state.profile.balance);

  const [showBalance, setShowBalance] = useState(false);

  const toggleBalanceVisibility = () => {
    setShowBalance(!showBalance);
    dispatch(fetchBalance());
  };

  useEffect(() => {
    dispatch(fetchProfile());
    dispatch(fetchBalance());
  }, [dispatch]);

  const profileImage =
    profiles?.profile_image ===
    "https://minio.nutech-integrasi.app/take-home-test/null"
      ? defaultProfile
      : profiles?.profile_image;

  return (
    <div className="row g-4 px-3 py-3 align-items-center">
      <div className="col-md-5 d-flex align-items-center">
        <Image
          src={profileImage}
          alt="Profile"
          roundedCircle
          style={{ width: "100px", height: "100px", objectFit: "cover", marginRight: "16px" }}
        />
        <div>
          <p className="mb-1 text-muted">Selamat Datang</p>
          <h5 className="fw-semibold">
            {profiles?.first_name} {profiles?.last_name}
          </h5>
        </div>
      </div>

      <div className="col-md-7">
        <div
          className="text-light rounded p-4"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <p className="mb-1">Saldo Anda</p>
          <h3 className="mb-3">
            {showBalance ? formatRupiah(balance) : "Rp •••••••"}
          </h3>
          <p
            onClick={toggleBalanceVisibility}
            style={{ cursor: "pointer", textDecoration: "underline" }}
          >
            {showBalance ? "Sembunyikan saldo" : "Lihat saldo"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;
