// react
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

// redux
import { useSelector, useDispatch } from "react-redux";
import { getCategories } from "../../../../store/actions/systemActions";
import { getProduct } from "../../../../store/actions/adminActions";

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
  const { error, loading } = systemProduct;

  const adminProduct = useSelector((state) => state.adminProduct);
  const { success, product } = adminProduct;

  const systemCategories = useSelector((state) => state.systemCategories);
  const { categories } = systemCategories;

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getProduct(id));
    if (success) {
      navigate("/admin/products/");
    }
  }, [dispatch, success, navigate, id]);

  console.log(product);
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
            onSubmit={(e) => onSubmit(e, dispatch, id)}
          >
            {(formik) => {
              return (
                <Form className={styles.form}>
                  {" "}
                  <h2>SPECIFICATION</h2>
                  <Inputs styles={styles} />
                  <Select styles={styles} categories={categories} />
                  <h2>DISCOUNT</h2>
                  <Discount styles={styles} formik={formik} />
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
