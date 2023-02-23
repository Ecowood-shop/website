// react
import { useEffect } from "react";

// redux
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getVariants, getColors } from "../../../store/actions/adminActions";

// components
import Loader from "../../../components/loader/Loader";
import Message from "../../../components/Message/Message";
import Discount from "./components/Discount";

// styles
import styles from "./styles.module.scss";

function DiscountScreen() {
  // HOOKS
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const adminVariants = useSelector((state) => state.adminVariants);
  // const { error, loading, variants, success, successUpdate, successCreate } =
  //   adminVariants;

  // const adminColors = useSelector((state) => state.adminColors);
  // const { colors } = adminColors;

  // useEffect(() => {
  //   dispatch(getVariants(id));
  //   dispatch(getColors());
  // }, [dispatch, success, successUpdate, successCreate]);

  // console.log(variants);
  // console.log(colors);

  return (
    <article className={styles.container}>
      <Discount create dispatch={dispatch}/>
      {/* {loading && <Loader color={"blueviolet"} />}
      {error && <Message>{error}</Message>} */}
      
      {/* {variants &&
        variants.map((variant) => (
          <Variant variant={variant} key={variant.id} />
        ))} */}
    </article>
  );
}

export default DiscountScreen;
