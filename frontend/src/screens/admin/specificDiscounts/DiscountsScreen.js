// react
import { useEffect } from "react";

// redux
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import {
  getDiscounts,
  deleteDiscount,
} from "../../../store/actions/discountActions";
import { useNavigate } from "react-router-dom";
// components
import Loader from "../../../components/loader/Loader";
import Message from "../../../components/Message/Message";
import Pagination from "../../../components/pagination/Pagination";
import DiscountFilter from "../../../components/filter/DiscountFilter";
import Table from "../../../components/table/Table";
import Nav from "./Nav";

// styles
import styles from "./styles.module.scss";

function DiscountsScreen() {
  // HOOKS
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  // QUERY PARAMS
  const word = searchParams.get("word");
  const page = searchParams.get("page");

  const Discounts = useSelector((state) => state.discounts);
  const { error, loading, discounts, success } = Discounts;

  useEffect(() => {
    dispatch(getDiscounts(page, word));
  }, [dispatch, success, page, word, navigate]);

  const columns = [
    {
      Header: "ID",
      accessor: "id",
    },
    {
      Header: "მეილი",
      accessor: "email",
    },
    {
      Header: "პროდუქტი",
      accessor: "product_name",
    },
    {
      Header: "ფასდაკლება",
      accessor: (discount) => discount.percentage.percentage + "%",
    },
  ];

  return (
    <article className={styles.container}>
      <DiscountFilter />
      <Nav styles={styles} navigate={navigate} />
      {loading && <Loader color={"blueviolet"} />}
      {error && <Message>{error}</Message>}
      {discounts && (
        <>
          <div className={styles.table}>
            <Table
              columns={columns}
              data={discounts["Specific Discounts"]}
              link="/admin/discounts/"
              linkEnd="/edit"
              Delete={(id) => dispatch(deleteDiscount(id))}
              text="მომხმარებლის"
            />
          </div>
          <Pagination pages={discounts.pages} page={discounts.page} />
        </>
      )}
    </article>
  );
}

export default DiscountsScreen;
