import { Formik, Form, Field } from "formik";
import React from "react";
import CONSTANTS from "../../../constants";
import { useDispatch } from "react-redux";
import { updateOrderStatusThunk } from "../../store/ordersSlice";

const AdminOrderForm = (props) => {
  const { order } = props;
  const dispatch = useDispatch();
  const showStatus = (status) => (
    <option key={status} value={status}>
      {status}
    </option>
  );
  const onSubmit = (value) => {
    dispatch(updateOrderStatusThunk({ id: order._id, status: value.status }));
  };
  return (
    <Formik initialValues={{ status: order?.status }} onSubmit={onSubmit}>
      <Form>
        <Field as="select" name="status">
          {CONSTANTS.ORDER_STATUS.map(showStatus)}
        </Field>
        <button type="submit">save</button>
      </Form>
    </Formik>
  );
};

export default AdminOrderForm;
