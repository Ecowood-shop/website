// REACT
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { getProduct } from "../../../store/actions/systemActions";

// COMPONENTS
import Message from "../../../components/Message/Message";
import Loader from "../../../components/loader/Loader";

// SECTIONS
import Section0 from "./sections/Section0";
import Section2 from "./sections/Section2";
import Main from "./main/Main";

// OTHERS
import styles from "./styles.module.scss";
import "react-image-gallery/styles/css/image-gallery.css";

// translate
import { useTranslation } from "react-i18next";

function Product() {
  // HOOKS
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  // VARIABLES
  const [iframe, setIframe] = useState(false);

  const systemProduct = useSelector((state) => state.systemProduct);
  const { error, loading, product } = systemProduct;

  const { t, i18n } = useTranslation(["app"]);

  useEffect(() => {
    dispatch(getProduct(params.id, i18n.language));
  }, [dispatch, params.id, i18n.language]);

  console.log(product);
  return (
    <article className={styles.container}>
      {loading && (
        <div className={styles.loaderContainer}>
          <Loader color="blueviolet" />
        </div>
      )}
      {error && <Message>{error}</Message>}
      {product?.products && (
        <>
          <Section0
            setter={(value) => setIframe(value)}
            navigate={navigate}
            iframe={iframe}
            youtube={product.products.youtubeUrl ? true : false}
            t={t}
          />
          <Main
            t={t}
            product={product.products}
            variants={product.variants}
            iframe={iframe}
            youtube={product.products.youtubeUrl ? true : false}
            navigate={navigate}
          />

          <Section2
            t={t}
            styles={styles}
            product={product.products}
            navigate={navigate}
            dispatch={dispatch}
            category={{
              id: product.products.category_id,
              category: product.products.category,
            }}
            i18n={i18n}
          />
        </>
      )}
    </article>
  );
}

export default Product;
