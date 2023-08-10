// Import styles
import styled from "styled-components";
// Import components
import Button from "../components/Button";

const Container = styled.div`
  display: flex;
  flex-direction: column;

  margin-top: 2rem;
  border-radius: 20px;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
`;

const HeaderText = styled.h2`
  color: var(--black);
  font-size: var(--medium-s);
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 2rem;
`;

const TextContainer = styled.div``;

const Text = styled.p`
  display: flex;
  justify-content: end;

  color: var(--blackWithOpacity);
  font-size: var(--small-l);
  text-transform: capitalize;

  b {
    margin-right: auto;
    font-weight: normal;
  }
  i {
    text-decoration: line-through;
    color: var(--color-error);
    margin-right: 0.6rem;
  }
`;

function Table({ cart, t }) {
  return (
    <Container className="w3-animate-bottom">
      <Header>
        <HeaderText>{t("cart.total")}</HeaderText>
      </Header>
      <Body>
        <TextContainer>
          <Text>
            <b>{t("global.quantity")}:</b> {cart ? cart.qty : 0}
          </Text>
          <Text>
            <b>{t("cart.total price")}: </b>{" "}
            {cart ? (
              Number(cart.sum_price) > Number(cart.discounted_sum_price) ? (
                <>
                  <i>{cart.sum_price}</i>
                  {cart.discounted_sum_price} ₾
                </>
              ) : (
                <> {cart.sum_price} ₾</>
              )
            ) : (
              <>0 ₾</>
            )}
          </Text>
        </TextContainer>
        <Button t={t} cart={cart} />
      </Body>
    </Container>
  );
}

export default Table;
