import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import CONSTANTS from "../../../constants";
import { orderDeliverySchema } from "../../validation/order.validate";
import { createOrderThunk } from "../../store/ordersSlice";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../store/cartSlice";
import { createCheckoutSession } from "../../api";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(CONSTANTS.STRIPE_SECRET_KEY);

const CartDeliveryForm = (props) => {
  const { items } = props;
  const { error } = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  const onSubmit = async (values) => {
    try {
      const stripe = await stripePromise;
      const orderValues = {
        products: items.map((item) => ({
          productId: item._id,
          quantity: item.quantity,
        })),
        ...values,
        shippingPrice: CONSTANTS.SHIPPING_PRICE[values.shippingMethod],
      };
      console.log(orderValues);

      const order = await dispatch(createOrderThunk(orderValues)).unwrap();

      const stripeProducts = items.map((item) => ({
        title: item.title,
        productPrice: item.price,
        quantity: item.quantity,
      }));

      const response = await createCheckoutSession(order._id, stripeProducts);
      await stripe.redirectToCheckout({ sessionId: response.data.id });

      dispatch(clearCart(order));
    } catch (error) {
      console.log(error);
    }
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
            {error && <h3>{error}</h3>}
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
