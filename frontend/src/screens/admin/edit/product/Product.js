// REACT
import  { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
// REDUX
import { useSelector, useDispatch } from "react-redux";
import { getProduct } from "../../../../store/actions/systemActions";

// OTHERS
import styles from "./styles.module.scss";

function Product() {
      // HOOKS
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params=useParams()

  const systemProduct = useSelector((state) => state.systemProduct);
  const { error, loading, product } = systemProduct;

  useEffect(() => {
    dispatch(getProduct(params.id));
  }, [dispatch]);
console.log(product)

  return (
    <div>Product</div>
  )
}

export default Product