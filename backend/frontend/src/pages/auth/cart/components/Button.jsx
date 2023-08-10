// Import styles
import { styled } from "styled-components";
import { respondTo } from "../../../../utils/styles/_respondTo";
// Import hooks
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  margin: 1rem 0;
`;
const Btn = styled.button`
  cursor: pointer;

  width: 100%;
  padding: 0.5rem 0;

  border: none;
  border-radius: 100px;

  color: var(--white);
  font-size: var(--small-l);
  background-image: var(--gradient-secondary);
  transition: color 0.1s ease-in-out;

  ${respondTo.desktop`
    &:hover {
      color: var(--whiteWithOpacity);
    }  
  `}

  ${respondTo.tv`
    &:hover {
      color: var(--whiteWithOpacity);
    }  
  `}
`;

function Button({ t, cart }) {
  // Initialize hooks
  const navigate = useNavigate();

  // Submit function
  const submit = () => {

    // If user is authorized
    if (cart) {
      for (const cartItem in cart.carts) {
        // Get variant for specific cart
        let variant = cart.variants.find(
          (item) => item.id === cart.carts[cartItem].variants
        );

        // If it violates validation return
        if (
          cart.carts[cartItem].qty > variant.quantity ||
          cart.carts[cartItem].qty < 1 ||
          !variant.active
        ) {
          return;
        }
      }

      // If validation is protected navigate to checkout
      if (cart.sum_price > 0) navigate("/checkout/shippingmethod");
    }
  };
  return (
    <Container>
      <Btn onClick={submit}> {t("cart.checkout")}</Btn>
    </Container>
  );
}

export default Button;
