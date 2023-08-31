// Import styles and icons
import { styled } from "styled-components";
import { respondTo } from "../../../utils/styles/_respondTo";

// Import hooks
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";

// Import components
import Nav from "./Nav";
import { DiscountFilter as Filter } from "../../../components/filter";
import { Loader, Pagination, ErrorMessage, Table } from "../../../components";

// Import actions
import {
  getDiscounts,
  deleteDiscount,
} from "../../../toolkit/discounts/actions";
import { reset } from "../../../toolkit/discounts/discountSlice";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  max-width: 1400px;
  padding: 3rem;

  ${respondTo.mobile`
    width:100%;
    padding: 3rem 1rem;
  `}

  ${respondTo.lowTablet`
    width:100%;
    padding: 3rem 1rem;
  `}

  ${respondTo.tablet`
    width:90%;
    padding: 3rem 1rem;
  `}
`;

const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  & > div {
    overflow-x: auto;
  }
`;

const columns = (t) => [
  {
    Header: "ID",
    accessor: "id",
  },
  {
    Header: t("global.email"),
    accessor: "email",
  },
  {
    Header: t("product.product"),
    accessor: "product_name",
  },
  {
    Header: t("product.discount"),
    accessor: (discount) => discount.percentage.percentage + "%",
  },
];

// Export discounts page
function DiscountsScreen() {
  // Initialize hoooks
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation(["admin"]);
  const [searchParams] = useSearchParams();

  // Query params
  const word = searchParams.get("word");
  const page = searchParams.get("page");

  // Get discounts from store
  const discountSlice = useSelector((state) => state.discounts);
  const { error, isLoading, discounts, success } = discountSlice;

  useEffect(() => {
    dispatch(getDiscounts({ page: page, word: word }));
    return () => {
      dispatch(reset());
    };
  }, [dispatch, success, page, word, navigate]);

  return (
    <Container>
      {/* Filter and nav bar */}
      <Filter />
      <Nav navigate={navigate} t={t} />

      {!isLoading && error && <ErrorMessage>{error}</ErrorMessage>}

      {isLoading ? (
        <Loader color="darkmagenta" />
      ) : (
        discounts && (
          <>
            <InnerContainer>
              {/* Discounts table */}
              <Table
                columns={columns(t)}
                data={discounts ? discounts["Specific Discounts"] : discounts}
                link="/admin/discounts/"
                linkEnd="/edit"
                Delete={(id) => dispatch(deleteDiscount({ id: id }))}
                text={t("product.discount")}
              />
            </InnerContainer>

            {/* Pagination for discounts */}
            <Pagination pages={discounts.pages} page={discounts.page} />
          </>
        )
      )}
    </Container>
  );
}

export default DiscountsScreen;
