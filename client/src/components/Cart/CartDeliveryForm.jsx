import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import CONSTANTS from "../../../constants";
import { orderDeliverySchema } from "../../validation/order.validate";
import { createOrderThunk } from "../../store/ordersSlice";
import { useDispatch } from "react-redux";
import { clearCart } from "../../store/cartSlice";

const CartDeliveryForm = (props) => {
  const { items } = props;
  const dispatch = useDispatch();
  const onSubmit = async (values) => {
    const orderValues = {
      products: items.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
      })),
      ...values,
      shippingPrice: CONSTANTS.SHIPPING_PRICE[values.shippingMethod],
    };
    console.log(orderValues);

    const order = await dispatch(createOrderThunk(orderValues));
    dispatch(clearCart(order));
  };
  return (
    <Formik
      initialValues={{
        customerPhone: "",
        shippingAdress: "",
        shippingMethod: CONSTANTS.SHIPPING_METHOD[0],
      }}
      validationSchema={orderDeliverySchema}
      onSubmit={onSubmit}
    >
      {() => {
        return (
          <Form>
            <label>
              <span>Phone</span>
              <Field name="customerPhone" type="tel" />
              <ErrorMessage name="customerPhone" />
            </label>

            <label>
              <span>Method</span>
              <Field name="shippingMethod" as="select">
                {CONSTANTS.SHIPPING_METHOD.map((method) => (
                  <option key={method} value={method}>
                    {method}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="shippingMethod" />
            </label>

            <label>
              <span>Adress</span>
              <Field name="shippingAdress" type="text" />
              <ErrorMessage name="shippingAdress" />
            </label>

            <button type="submit">create order and payment</button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default CartDeliveryForm;

/*
  products,
      customerPhone,
      shippingAdress,
      shippingMethod,
      shippingPrice,

*/
