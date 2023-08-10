// Import styles
import styled from "styled-components";
// Import components
import Button from "../components/Button";
import { respondTo } from "../../../../utils/styles/_respondTo";

const Container = styled.div`
  z-index: 1000;
  position: fixed;

  bottom: 0;
  left: 50%;
  transform: translateX(-50%);

  display: flex;
  margin-left: auto;
  width: fit-content;
  flex-direction: column;

  padding: 1rem 2rem 0 2rem;
  border-radius: 20px 20px 0 0;
  background-color: var(--color-primary);

  ${respondTo.tv`
    position:absolute;
    border-radius:20px;
    transform:translate(-50%,-500px);
  `}
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeaderText = styled.h2`
  margin: 0;
  color: var(--white);
  font-size: var(--medium-s);
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TextContainer = styled.div`
  width: 400px;

  ${respondTo.tv`
    min-width:600px;
    width:calc(40vw * 0.3);
  `}
`;

const Text = styled.p`
  display: flex;
  justify-content: end;

  color: var(--white);
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
