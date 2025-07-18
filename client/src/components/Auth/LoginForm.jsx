import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUserThunk } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import styles from "../Auth/authForm.module.scss";
import { loginValidateSchema } from "../../validation/user.validate";

const LoginForm = () => {
  const { error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = (values) => {
    dispatch(loginUserThunk(values))
      .unwrap()
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={onSubmit}
      validationSchema={loginValidateSchema}
    >
      {() => (
        <Form className={styles["form"]}>
          {error && error.includes("401") && <p>Invalid data</p>}
          <h2>Sign in:</h2>
          <Field name="email" type="email" placeholder="email" />
          <ErrorMessage name="email" />

          <Field name="password" type="password" placeholder="password" />
          <ErrorMessage name="password" />

          <button className={styles["btn-submit"]} type="submit">
            Login
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
