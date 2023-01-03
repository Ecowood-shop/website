// REACT
import { useEffect } from "react";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import { useNavigate} from "react-router-dom";
import { getShippingPrices } from "../../../store/actions/shippingActions";

// COMPONENTS
import Loader from "../../../components/loader/Loader";
import Message from "../../../components/Message/Message";
import City from "./city/City";

// OTHERS
import styles from "./styles.module.scss";

function Shipping() {
  // HOOKS
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const adminVariants = useSelector((state) => state.adminVariants);
  // const { error, loading, variants, success, successUpdate,successCreate } = adminVariants;

  const shipping = useSelector((state) => state.shipping);
  const { prices,loading,error } = shipping;

  useEffect(() => {
    dispatch(getShippingPrices());

    // , success, successUpdate,successCreate
  }, [dispatch]);
console.log(prices)
  return (
    <article className={styles.container}>
      <button
        onClick={() => navigate(`/admin/orders`)}
        className={styles.button}
      >
        უკან
      </button>
       <City create/>
      {loading && <Loader color={"blueviolet"} />}
      {error && <Message>{error}</Message>}
      {prices &&
        prices.map((city) => <City city={city} key={city._id} />)}
    </article>
  );
}

export default Shipping;
