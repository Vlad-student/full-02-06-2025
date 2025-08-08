import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { updateOrderStatusThunk } from "../store/ordersSlice";

const SuccesPage = () => {
  const { idOrder } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateOrderStatusThunk({ id: idOrder, status: "paid" }));
  }, [dispatch, idOrder]);
  return (
    <section>
      <h2> Thanks </h2>
      <Link to="/"> back </Link>
    </section>
  );
};

export default SuccesPage;
