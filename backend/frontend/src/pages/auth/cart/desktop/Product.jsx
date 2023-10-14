// Import styles
import styled from "styled-components";
import { respondTo } from "../../../../utils/styles/_respondTo";
// Import hooks
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// Import components
import Color from "../components/Color";
import Form from "../components/Form";
import Price from "../components/Price";
// Import actions
import { deleteCart } from "../../../../toolkit/cart/actions";
// Import images and icons
import { CloseSVG } from "../../../../static/icons/components";
import placeholder from "../../../../static/images/placeholder.png";

const Timage = styled.td`
  cursor: pointer;
  height: 6rem;
  padding: 0.5rem;
  img {
    height: 100%;
  }

  ${respondTo.laptop`
    height:5rem;
  `}
`;

const Tname = styled.td`
  padding: 1rem;
  text-align: left;
  max-width: 0;
`;
const Tcolor = styled.td``;
const Tquantity = styled.td``;

const Tsize = styled.td`
  width: auto;
  padding: 0 1rem;
  text-align: center;
  white-space: nowrap;
`;

const Tprice = styled.td`
  padding: 0 1rem;
  text-align: center;
`;

const Tdelete = styled.td`
  vertical-align: center;
  align-content: center;
  box-sizing: border-box;
  padding: 0 0.5rem;
`;

const IconContainer = styled.div`
  margin: auto;
  cursor: pointer;
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0.5rem;
  background-color: var(--white);

  svg {
    fill: var(--red);
    transition: fill 0.1s ease-in-out;
  }

  &:hover {
    svg {
      fill: var(--redWithOpacity);
    }
  }
`;
function Product({ product, variant, cart, t, i18n }) {
  // Initialize hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <>
      {/* Product image */}
      <Timage>
        <img
          src={
            product?.picture_set?.length > 0
              ? product?.picture_set[0]?.picture
              : placeholder
          }
          onClick={() => navigate(`/product/${product._id}`)}
          alt={product.name_geo}
        />
      </Timage>

      {/* Product name */}
      <Tname>{product.name_geo}</Tname>

      {/* Product variant color */}
      <Tcolor>
        <Color variant={variant} t={t} />
      </Tcolor>

      {/* Product size */}
      <Tsize>{product.size}</Tsize>

      {/* Product variant quantity */}
      <Tquantity>
        <Form t={t} i18n={i18n} cart={cart} variant={variant} />
      </Tquantity>

      {/* Product price */}
      <Tprice>
        <Price product={product} />
      </Tprice>

      <Tdelete>
        <IconContainer
          onClick={() =>
            dispatch(deleteCart({ id: cart.id, language: i18n.language }))
          }
        >
          <CloseSVG />
        </IconContainer>
      </Tdelete>
    </>
  );
}

export default Product;
