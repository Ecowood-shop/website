// Import styles and icons
import { styled } from "styled-components";
import { ErrorSVG } from "../../../static/icons/components";
import { respondTo } from "../../../utils/styles/_respondTo";

// Import hooks
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";

// Import components
import Nav from "./Nav";
import { ProductFilter as Filter } from "../../../components/filter";
import { Loader, Pagination, ErrorMessage, Table } from "../../../components";

// Import actions
import { reset } from "../../../toolkit/product/productSlice";
import { getProducts, deleteProduct } from "../../../toolkit/product/actions";

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

const MessageContainer = styled.div`
  ${(props) => props.$auth && "cursor:pointer;"}
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;

  margin: 1rem 0;
  padding: 1rem 0;
  border-radius: 20px;

  gap: 0.5rem;
  color: var(--red);
  font-size: var(--small-l);
  text-transform: capitalize;

  svg {
    stroke: var(--red);
    height: 24px;
    width: 24px;
  }

  ${respondTo.desktop`
  margin:7rem 0 1rem 0;
  `}
`;

const columns = (t) => [
  {
    Header: "ID",
    accessor: "_id",
  },
  {
    Header: t("product.name(product)"),
    accessor: "name_geo",
  },
  {
    Header: t("global.category"),
    accessor: "category",
  },
  {
    Header: t("product.price"),
    accessor: "price",
  },
];

// Export products page
function ProductsScreen() {
  // Initialize hoooks
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation(["admin"]);
  const [searchParams] = useSearchParams();

  // Query params
  const category = searchParams.get("category");
  const word = searchParams.get("word");
  const orderby = searchParams.get("orderby");
  const page = searchParams.get("page");

  // Get products from store
  const productSlice = useSelector((state) => state.products);
  const { isLoading, products, error, success } = productSlice;

  useEffect(() => {
    dispatch(
      getProducts({
        language: i18n.language,
        word: word,
        category: category,
        orderby: orderby,
        page: page,
      })
    );
    return () => {
      dispatch(reset());
    };
  }, [dispatch, category, word, orderby, page, success, i18n.language]);

  return (
    <Container>
      {/* Filter and nav bar */}
      <Filter />
      <Nav navigate={navigate} t={t} />

      {!isLoading && error && <ErrorMessage>{error}</ErrorMessage>}
      {isLoading ? (
        <Loader color="darkmagenta" />
      ) : products?.products?.length > 0 ? (
        <>
          <InnerContainer>
            {/* Orders table */}
            <Table
              columns={columns(t)}
              data={products.products}
              link="/admin/products/"
              linkEnd="/edit"
              Delete={(id) =>
                dispatch(deleteProduct({ id: id, language: i18n.language }))
              }
              text={t("global.deleteproduct")}
            />
          </InnerContainer>

          {/* Pagination for products */}
          <Pagination pages={products.pages} page={products.page} />
        </>
      ) : (
        <MessageContainer>
          <ErrorSVG />
          <p>{t("product.no products found")}</p>
        </MessageContainer>
      )}
    </Container>
  );
}

export default ProductsScreen;
