import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUserThunk } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { registerValidateSchema } from "../../validation/user.validate";
import styles from "../Auth/authForm.module.scss";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const onSubmit = (values) => {
    dispatch(registerUserThunk(values))
      .unwrap()
      .then(() => {
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Formik
      initialValues={{ login: "", email: "", password: "" }}
      onSubmit={onSubmit}
      validationSchema={registerValidateSchema}
    >
      {() => {
        return (
          <Form className={styles["form"]}>
            {error && <p>Email has already existed</p>}
            <h2>Sign up</h2>
            <Field name="login" type="text" placeholder="login" />
            <ErrorMessage name="login" />

            <Field name="email" type="email" placeholder="email" />
            <ErrorMessage name="email" />

            <Field name="password" type="password" placeholder="password" />
            <ErrorMessage name="password" />
            <button className={styles["btn-submit"]} type="submit">
              Register
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default RegisterForm;
