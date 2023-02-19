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
import Section1 from "./sections/Section1";
import Section2 from "./sections/Section2";
import Main from "./main/Main";

// OTHERS
import styles from "./styles.module.scss";
import "react-image-gallery/styles/css/image-gallery.css";

function Product() {
  // HOOKS
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  // VARIABLES
  const [iframe, setIframe] = useState(false);

  const systemProduct = useSelector((state) => state.systemProduct);
  const { error, loading, product } = systemProduct;

  useEffect(() => {
    dispatch(getProduct(params.id));
  }, [dispatch,params.id]);

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
          />
          <Main
            product={product.products}
            variants={product.variants}
            iframe={iframe}
            youtube={product.products.youtubeUrl ? true : false}
            navigate={navigate}
          />

          <Section2
            styles={styles}
            product={product.products}
            navigate={navigate}
            dispatch={dispatch}
            category={product.products.category}
          />
        </>
      )}
    </article>
  );
}

export default Product;
