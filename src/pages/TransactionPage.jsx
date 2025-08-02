/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listTransactionAsync } from "../features/profile/ProfilThunks";
import { formatRupiah } from "../utils/format";
import { Navigationbar } from "../components/Navbar";
import ProfileComponent from "../components/ProfileComponent";
import { format, parseISO } from "date-fns";

const TransactionPage = () => {
  const dispatch = useDispatch();
  const transaction = useSelector((state) => state.profile.transaction.data);
  const offset = useSelector((state) => state.profile.offset);

  useEffect(() => {
    dispatch(listTransactionAsync(offset));
  }, [dispatch]);

  const handleShowMore = () => {
    dispatch(listTransactionAsync(offset + 5));
  };

  return (
    <>
      <Navigationbar />
      <Container className="py-4">
        <ProfileComponent />

        <div className="mt-4">
          <h5 className="fw-semibold mb-3">Semua Transaksi</h5>

          {transaction?.records?.length === 0 ? (
            <p className="text-center">Tidak ada transaksi.</p>
          ) : (
            transaction?.records?.map((item, index) => (
              <div className="card shadow-sm p-3 mb-3" key={index}>
                <div className="d-flex justify-content-between align-items-center">
                  <p
                    className={`fs-5 fw-bold ${
                      item.description === "Top Up Balance" ? "text-success" : "text-danger"
                    }`}
                  >
                    {item.description === "Top Up Balance" ? "+" : "-"}
                    {formatRupiah(item.total_amount)}
                  </p>
                  <p className="text-end mb-0">{item.description}</p>
                </div>
                <p className="text-secondary mb-0">
                  {format(parseISO(item.created_on), "dd MMMM yyyy 'pukul' HH:mm")}
                </p>
              </div>
            ))
          )}

          <div
            className="my-5 text-center fw-bold text-danger"
            onClick={handleShowMore}
            style={{ cursor: "pointer" }}
          >
            Show more
          </div>
        </div>
      </Container>
    </>
  );
};

export default TransactionPage;
