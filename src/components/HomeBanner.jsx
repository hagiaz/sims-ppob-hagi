/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBanner } from "../features/profile/ProfilThunks";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Banner = () => {
  const dispatch = useDispatch();
  const banner = useSelector((state) => state.profile.banner);
  const loading = useSelector((state) => state.profile.loading);

  useEffect(() => {
    dispatch(fetchBanner());
  }, [dispatch]);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      partialVisibilityGutter: 40,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      partialVisibilityGutter: 30,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      partialVisibilityGutter: 20,
    },
  };

  return (
    <section style={{ margin: "20px 0" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 16px" }}>
        {banner && banner.length > 0 ? (
          <Carousel
            responsive={responsive}
            autoPlay
            autoPlaySpeed={3000}
            infinite
            arrows={false}
            showDots={true}
            keyBoardControl
            swipeable
            draggable
          >
            {banner.map((data, index) => (
              <div key={index} style={{ padding: "8px" }}>
                <img
                  src={data?.banner_image}
                  alt={`banner-${index}`}
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: "12px",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    cursor: "pointer",
                  }}
                />
              </div>
            ))}
          </Carousel>
        ) : (
          <div style={{ textAlign: "center", padding: "20px" }}>
            <span>Loading banner...</span>
          </div>
        )}
      </div>
    </section>
  );
};

export default Banner;
