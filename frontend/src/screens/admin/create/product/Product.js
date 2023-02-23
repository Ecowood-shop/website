// react
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// redux
import { useSelector, useDispatch } from "react-redux";
import { createProduct } from "../../../../store/actions/adminActions";
import { getCategories } from "../../../../store/actions/systemActions";
import { getDiscounts } from "../../../../store/actions/discountActions";

// components
import { Formik, Form } from "formik";
import Loader from "../../../../components/loader/Loader";
import Message from "../../../../components/Message/Message";
import Select from "./components/Select";
import Inputs from "./components/Inputs";
import Textarea from "./components/Textarea";
import Discount from "./components/Discount";

// values
import { initialValues, validationSchema, onSubmit } from "./values";

// styles
import styles from "./styles.module.scss";

function Product() {
  // hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const adminProduct = useSelector((state) => state.adminProduct);
  const { error, loading, createSuccess: success } = adminProduct;

  const systemCategories = useSelector((state) => state.systemCategories);
  const { categories } = systemCategories;

  const Discounts = useSelector((state) => state.Discounts);
  const { discounts } = Discounts;

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getDiscounts());
    if (success) navigate("/admin/products/");
  }, [dispatch, navigate, success]);

  console.log(discounts);
  console.log(categories);
  return (
    <article className={styles.container}>
      <button
        onClick={() => navigate("/admin/products/")}
        className={styles.button}
      >
        უკან
      </button>{" "}
      <section>
        <h1>პროდუქტი</h1>
        {loading && <Loader />}
        {error && <Message>{error}</Message>}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => {
            return (
              <Form className={styles.form}>
                <h2>SPECIFICATION</h2>
                <Inputs styles={styles} />
                <Select styles={styles} categories={categories} />

                <h2>DISCOUNT</h2>
                <Discount
                  styles={styles}
                  discounts={discounts}
                  formik={formik}
                />

                <h2>DETAILS</h2>
                <Textarea styles={styles} />
                <button type="submit" className={styles.button}>
                  Submit
                </button>
              </Form>
            );
          }}
        </Formik>
      </section>
    </article>
  );
}

export default Product;
