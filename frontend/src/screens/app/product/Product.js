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
  }, [dispatch]);

  console.log(product);

  return (
    <article className={styles.container}>
      {loading && <Loader />}
      {error && <Message>{error}</Message>}
      {product && (
        <>
          <Section0
            styles={styles}
            setter={(value) => setIframe(value)}
            navigate={navigate}
          />
          <Section1 styles={styles} product={product} iframe={iframe} />
          <Section2 styles={styles} product={product} />
        </>
      )}
    </article>
  );
}

export default Product;
