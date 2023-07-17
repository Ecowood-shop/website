// REACT
import { useNavigate } from "react-router-dom";
// styles
import styles from "./product.module.scss";
// images
import placeholder from "../../../static/images/placeholder.png";

function Product(props) {
  // HOOKS
  const navigate = useNavigate();
  const images = [...props.product?.picture_set];
  const src =
    images?.length > 0
      ? images?.sort((a, b) => a.ord - b.ord)[0]?.picture
      : placeholder;
  return (
    <div
      className={styles.container}
      onClick={() => navigate(`/product/${props.product._id}`)}
    >
      {props.product?.discount &&
        parseFloat(props.product?.discount.percentage) > 0 && (
          <div className={styles.discount}>
            -{parseFloat(props.product.discount.percentage)}%
          </div>
        )}

      <img alt={props.product.name_geo} src={src} />
      <div className={styles.table}>
        <h2>{props.product.name_geo}</h2>
        <div>
          <h2>{props.product.size}</h2>

          <h2>
            {props.product?.discount &&
            parseFloat(props.product?.discount.percentage) > 0 ? (
              <>
                <i> {props.product.price}</i>
                {(
                  parseFloat(props.product.price) -
                  (parseFloat(props.product.price) *
                    parseFloat(props.product.discount.percentage)) /
                    100
                ).toFixed(2)}{" "}
                ₾
              </>
            ) : (
              <>{props.product.price} ₾</>
            )}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Product;
