// react
import { useEffect } from "react";

// redux
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import {
  getDiscounts,
  getUsers,
  getProducts,
} from "../../../store/actions/discountActions";
import { useNavigate } from "react-router-dom";
// components
import Loader from "../../../components/loader/Loader";
import Message from "../../../components/Message/Message";
import Discount from "./components/Discount";
import Pagination from "../../../components/pagination/Pagination";
import DiscountFilter from "../../../components/filter/DiscountFilter";

// styles
import styles from "./styles.module.scss";

function DiscountScreen() {
  // HOOKS
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  // QUERY PARAMS
  const word = searchParams.get("word");
  const page = searchParams.get("page");

  const Discounts = useSelector((state) => state.discounts);
  const { error, loading, discounts, users, products, success } = Discounts;

  useEffect(() => {
    if (success) {
      navigate("");
    }
    dispatch(getUsers());
    dispatch(getProducts());
    dispatch(getDiscounts(page, word));
  }, [dispatch, success, page, word, navigate]);

  console.log(discounts);
  console.log(users);
  console.log(products);
  let customUsers =
    users?.length > 0
      ? users.map((user) => ({
          value: user.id,
          label:
            user.first_name +
            " " +
            user.last_name +
            ", " +
            user.email +
            ", ID : " +
            user.id,
        }))
      : {};
  let customProducts =
    products?.length > 0
      ? products.map((product) => ({
          value: product._id,
          label: product.name_geo + ", ID : " + product._id,
        }))
      : {};

  return (
    <article className={styles.container}>
      <Discount
        create
        dispatch={dispatch}
        products={customProducts}
        users={customUsers}
      />
      <DiscountFilter />
      {loading && <Loader color={"blueviolet"} />}
      {error && <Message>{error}</Message>}
      {discounts && (
        <>
          {discounts["Specific Discounts"].map((discount) => (
            <Discount
              dispatch={dispatch}
              user={discount.user}
              product={discount.product}
              discount={discount.percentage}
              username={discount.email}
              productname={discount.product_name}
              products={customProducts}
              users={customUsers}
              id={discount.id}
              key={discount.id}
            />
          ))}{" "}
          <Pagination pages={discounts.pages} page={discounts.page} />
        </>
      )}
    </article>
  );
}

export default DiscountScreen;
