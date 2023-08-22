// Import styles
import styled from "styled-components";
// Import hooks
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import useWindowDimensions from "../../../utils/hooks/useWindowDimensions";

// Import components
import Table from "./desktop/Table";
import MobileTable from "./mobile/MobileTable";
import ProductTable from "./desktop/ProductTable";
import { Loader } from "../../../components";
// Import actions
import { getCart } from "../../../toolkit/cart/actions";
import { reset } from "../../../toolkit/cart/cartSlice";
import { respondTo } from "../../../utils/styles/_respondTo";

const Container = styled.div`
  width: 90%;
  display: flex;
  justify-content: center;

  padding: 5rem 0;

  ${respondTo.desktop`
    width: 80%;
  `}

  ${respondTo.tv`
    width:1400px;
  `}
`;

const InnerContainer = styled.div`
  width: 100%;
  display: flex;
`;

// Export cart page
function Cart() {
  // Initialize hooks
  const dispatch = useDispatch();
  const renderCount = useRef(0);
  const { width } = useWindowDimensions();
  const { t, i18n } = useTranslation(["auth"]);

  // Get cart from cart slice
  const cartSlice = useSelector((state) => state.cart);
  const { cart, isLoading, success } = cartSlice;

  useEffect(() => {
    dispatch(getCart({ language: i18n.language }));
    return () => {
      dispatch(reset());
    };
  }, [dispatch, success, i18n.language]);

  if (renderCount.current < 3) ++renderCount.current;

  return (
    <Container>
      {isLoading && renderCount.current < 3 ? (
        <Loader color="darkmagenta" />
      ) : (
        <InnerContainer>
          {width > 1024 ? (
            <>
              <ProductTable cart={cart} t={t} />
              <Table cart={cart} t={t} />
            </>
          ) : (
            <MobileTable cart={cart} t={t} />
          )}
        </InnerContainer>
      )}
    </Container>
  );
}

export default Cart;
