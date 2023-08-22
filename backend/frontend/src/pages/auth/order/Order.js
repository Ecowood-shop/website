// Impor styles
import styled from "styled-components";
import { respondTo } from "../../../utils/styles/_respondTo";
// Import hooks
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import useWindowDimensions from "../../../utils/hooks/useWindowDimensions";

// Import actions
import { getOrder } from "../../../toolkit/orders/actions";
import { reset } from "../../../toolkit/orders/orderSlice";

// Import component
import Details from "./components/Details";
import ProductTable from "./components/desktop/ProductTable";
import MobileTable from "./components/mobile/MobileTable";
import { Loader, ErrorMessage } from "../../../components";

const Container = styled.div`
  width: 80%;
  min-height: 40vh;
  display: flex;
  flex-direction: column;

  padding: 5rem;
  margin: 3rem 0;

  border-radius: 10px;
  background-color: var(--white);
  box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px,
    rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;

  ${(props) =>
    props.$error && "padding:0;background:transparent;box-shadow:none;"}

  ${respondTo.mobile`
    width:100%;
    padding:1rem;
    margin:1rem 0;

    border:none;
    box-shadow:none;
    background:transparent;
  `}

  ${respondTo.lowTablet`
    width:100%;
    padding:1rem;
    margin:1rem 0;

    border:none;
    box-shadow:none;
    background:transparent;
  `}


  ${respondTo.tablet`
    width:100%;
    padding:3rem;
    margin:1rem 0;

    border:none;
    box-shadow:none;
    background:transparent;
  `}

  ${respondTo.laptop`
    padding:3rem;
  `}

  ${respondTo.tv`
    width:1400px;
  `}
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.h1`
  font-size: var(--medium-m);
`;

// Export order page
function Order() {
  // Initialize hooks
  const params = useParams();
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();
  const { t, i18n } = useTranslation(["auth"]);

  // Get order from store
  const orderSlice = useSelector((state) => state.orders);
  const { error, isLoading, order, success } = orderSlice;

  useEffect(() => {
    dispatch(getOrder({ id: params.id, language: i18n.language }));
    return () => {
      dispatch(reset());
    };
  }, [dispatch, params.id, success, i18n.language]);

  return (
    <Container $error={error}>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {isLoading ? (
        <Loader color="darkmagenta" />
      ) : (
        order?.Order && (
          <>
            <InnerContainer className="w3-animate-right">
              <Header>
                {t("order.order")} N{params.id}
              </Header>
              <Details t={t} order={order} id={params.id} />
            </InnerContainer>

            {width > 1024 ? (
              <ProductTable t={t} order={order} />
            ) : (
              <MobileTable t={t} order={order} />
            )}
          </>
        )
      )}
    </Container>
  );
}

export default Order;
