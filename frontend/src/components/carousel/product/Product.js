// REACT
import { useNavigate } from "react-router-dom";
// OTHERS
import styles from "./product.module.scss";

function Product(props) {
  // HOOKS
  const navigate = useNavigate();
 
  return (
    <div
      className={styles.container}
      onClick={() => navigate(`/product/${props.product._id}`)}
    >
      <img src={props.product?.picture_set.sort((a,b) => a.ord - b.ord)[0]?.picture} />
      <div className={styles.table}>
        <h2>{props.product.name_geo}</h2>
        <div>
          <h2>{props.product.size}</h2>
          <h2>{props.product.price} ლ</h2>
        </div>
      </div>
    </div>
  );
}

export default Product;
