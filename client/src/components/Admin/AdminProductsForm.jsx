import React from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import styles from "../stylesComponents/Admin.module.scss";
import { useSelector } from "react-redux";

const AdminProductsForm = () => {
  const { categories } = useSelector((state) => state.categories);
  return (
    <Formik>
      {() => {
        const showOption = (category) => (
          <option key={category._id} value={category._id}>
            {category.name}
          </option>
        );
        return (
          <Form className={styles["form"]}>
            <label>
              <span>Title</span>
              <Field name="title" />
              <ErrorMessage name="title" />
            </label>

            <label>
              <span>Description</span>
              <Field name="description" />
              <ErrorMessage name="description" />
            </label>

            <label>
              <span>Price</span>
              <Field name="price" type="number" step="0.01" />
              <ErrorMessage name="price" />
            </label>

            <label>
              <span>Stock</span>
              <Field name="stockQTY" type="number" min="0" />
              <ErrorMessage name="stockQTY" />
            </label>

            <label>
              <span>Category</span>
              <Field name="category" as="select">
                <option>Choose category</option>
                {categories?.map(showOption)}
              </Field>
              <ErrorMessage name="category" />
            </label>

            <label>
              <span>Images</span>
              <input name="image" type="file" />
            </label>

            <button type="" submit>
              Create
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AdminProductsForm;
