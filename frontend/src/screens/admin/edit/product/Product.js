// react
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

// redux
import { useSelector, useDispatch } from "react-redux";
import { updateProduct } from "../../../../store/actions/adminActions";
import { getDiscounts } from "../../../../store/actions/discountActions";
import {
  getCategories,
  getProduct,
} from "../../../../store/actions/systemActions";

// components
import { Formik, Form } from "formik";
import Loader from "../../../../components/loader/Loader";
import Message from "../../../../components/Message/Message";
import Select from "./components/Select";
import Inputs from "./components/Inputs";
import Textarea from "./components/Textarea";
import Discount from "./components/Discount";
import Buttons from "./components/Buttons";

// values
import { initialValues, validationSchema, onSubmit } from "./values";

// styles
import styles from "./styles.module.scss";

function Product() {
  // hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const systemProduct = useSelector((state) => state.systemProduct);
  const { error, loading, product } = systemProduct;

  const adminProduct = useSelector((state) => state.adminProduct);
  const { success } = adminProduct;

  const systemCategories = useSelector((state) => state.systemCategories);
  const { categories } = systemCategories;

  const Discounts = useSelector((state) => state.Discounts);
  const { discounts } = Discounts;

  useEffect(() => {
    dispatch(getDiscounts());
    dispatch(getCategories());
    dispatch(getProduct(id));
    if (success) {
      navigate("/admin/products/");
    }
  }, [dispatch, success, navigate, id]);

  console.log(product);
  console.log(discounts);
  console.log(categories);
  return (
    <article className={styles.container}>
      <button
        onClick={() => navigate("/admin/products/")}
        className={styles.button}
      >
        უკან
      </button>
      {loading && <Loader />}

      <section>
        <Buttons styles={styles} id={id} navigate={navigate} />
        <h1>რედაქტირება</h1>
        {error && <Message>{error}</Message>}
        {product?.products && (
          <Formik
            initialValues={initialValues(product.products)}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(formik) => {
              return (
                <Form className={styles.form}>
                  {" "}
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
        )}
      </section>
    </article>
  );
}

export default Product;
