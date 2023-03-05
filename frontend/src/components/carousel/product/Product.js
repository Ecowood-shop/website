// REACT
import { useNavigate } from "react-router-dom";
// styles
import styles from "./product.module.scss";
// images
import placeholder from "../../../static/images/placeholder.png";

function Product(props) {
  // HOOKS
  const navigate = useNavigate();

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

      <img
        alt={props.product.name_geo}
        src={
          props.product?.picture_set?.length > 0
            ? props.product?.picture_set?.sort((a, b) => a.ord - b.ord)[0]
                ?.picture
            : placeholder
        }
      />
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
                ლ
              </>
            ) : (
              <>{props.product.price} ლ</>
            )}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Product;
