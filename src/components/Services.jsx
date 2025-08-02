import { Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchServices } from "../features/profile/ProfilThunks";

export const Services = () => {
  const services = useSelector((state) => state.profile.services);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Cegah fetch ulang jika data sudah ada
  useEffect(() => {
    if (!services) {
      dispatch(fetchServices());
    }
  }, [dispatch, services]);

  return (
    <div className="mt-4 text-center d-flex justify-content-center flex-wrap">
      {services === null && (
        <p>Loading layanan...</p>
      )}

      {services?.length > 0 && services.map((item, i) => (
        <div key={i} className="mx-3 mb-3">
          <Image
            src={item.service_icon}
            alt={item.service_name}
            className="ms-2 me-2"
            style={{ width: "64px", height: "64px", objectFit: "contain", cursor: "pointer" }}
            onClick={() => navigate(`/profile-buy/${i}`)}
          />
          <p style={{ fontSize: "15px", marginTop: "8px" }}>
            {item.service_name}
          </p>
        </div>
      ))}
    </div>
  );
};
