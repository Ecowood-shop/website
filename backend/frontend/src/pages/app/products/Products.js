// Styles
import { styled } from "styled-components";
import { ErrorSVG } from "../../../static/icons/components";
import { respondTo } from "../../../utils/styles/_respondTo";
// Hooks
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
// Functions
import { getProducts } from "../../../toolkit/product/actions";
// Components
import { ProductFilter as Filter } from "../../../components/filter";
import Product from "../../../components/carousel/components/Product";
import { Loader, Pagination } from "../../../components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  max-width: 1400px;
  padding: 3rem;

  ${respondTo.mobile`
    width:100%;
  `}

  ${respondTo.lowTablet`
    width:100%;
  `}
`;

const InnerContainer = styled.div`
  width: 100%;
  display: grid;
  margin-top: 3rem;
  column-gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
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

  p::first-letter {
    text-transform: capitalize;
  }
  svg {
    stroke: var(--red);
    height: 24px;
    width: 24px;
  }

  ${respondTo.desktop`
    margin:7rem 0 1rem 0;
  `}
`;

// Export Products page
function Products() {
  // Initialize hooks
  const dispatch = useDispatch();

  const { t, i18n } = useTranslation(["app"]);
  const [searchParams] = useSearchParams();

  // Query params
  const category = searchParams.get("category");
  const word = searchParams.get("word");
  const orderby = searchParams.get("orderby");
  const page = searchParams.get("page");

  const productsSlice = useSelector((state) => state.products);
  const { isLoading, products } = productsSlice;

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
  }, [dispatch, category, word, orderby, page, i18n.language]);
  return (
    <Container>
      {/* Products filter  */}
      <Filter />

      {isLoading ? (
        <Loader color="darkmagenta" />
      ) : products?.products?.length > 0 ? (
        <>
          {/* Products from carousel */}
          <InnerContainer className={" w3-animate-right"}>
            {products.products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </InnerContainer>
          {/* Pagination for products */}
          <Pagination pages={products.pages} page={products.page} />
        </>
      ) : (
        <MessageContainer>
          <ErrorSVG />
          <p>{t("error.no products found")}</p>
        </MessageContainer>
      )}
    </Container>
  );
}

export default Products;
