import React from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import styles from "../stylesComponents/Admin.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  createProductThunk,
  updateProductThunk,
} from "../../store/productsSlice";
import {
  productCreateSchema,
  productUpdateSchema,
} from "../../validation/product.validate";

const AdminProductsForm = (props) => {
  const { selectedProduct, cancelForm } = props;
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  const initialValues = {
    title: selectedProduct?.title || "",
    description: selectedProduct?.description || "",
    price: selectedProduct?.price || "",
    stockQty: selectedProduct?.stockQty || "",
    category: selectedProduct?.category._id || "",
    images: [],
  };
  const onSubmit = (values) => {
    const data = new FormData();
    data.append("title", values.title);
    data.append("description", values.description);
    data.append("price", values.price);
    data.append("stockQty", values.stockQty);
    data.append("category", values.category);
    values.images.forEach((file) => data.append("images", file));
    if (selectedProduct) {
      dispatch(updateProductThunk({ id: selectedProduct._id, values: data }));
    } else {
      dispatch(createProductThunk(data));
    }

    cancelForm();
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={
        selectedProduct ? productUpdateSchema : productCreateSchema
      }
    >
      {({ setFieldValue }) => {
        const showOption = (category) => (
          <option key={category._id} value={category._id}>
            {category.name}
          </option>
        );
        return (
          <Form className={styles["form"]}>
            <label>
              <span>title</span>
              <Field name="title" />
              <ErrorMessage name="title" />
            </label>

            <label>
              <span>description</span>
              <Field name="description" />
              <ErrorMessage name="description" />
            </label>

            <label>
              <span>price</span>
              <Field name="price" type="number" step="0.01" />
              <ErrorMessage name="price" />
            </label>

            <label>
              <span>stock</span>
              <Field name="stockQty" type="number" min="0" />
              <ErrorMessage name="stockQty" />
            </label>

            <label>
              <span>category</span>
              <Field name="category" as="select">
                <option>Choose category</option>
                {categories?.map(showOption)}
              </Field>
              <ErrorMessage name="category" />
            </label>

            <label>
              <span>images</span>
              <input
                name="images"
                type="file"
                multiple
                onChange={(event) => {
                  setFieldValue("images", Array.from(event.target.files));
                }}
              />
            </label>

            <button type="submit">Create</button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AdminProductsForm;
