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

const GridContainer = styled.div`
  position: relative;

  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 1fr min-content min-content;

  gap: 10px;
  padding: 1rem 0;
  border-bottom: 0.1rem solid whitesmoke;

  ${respondTo.mobile`
   grid-template-columns: 1fr 1fr min-content ;
    grid-template-rows: 1fr min-content min-content min-content;
  `}

  ${respondTo.lowTablet`
    grid-template-columns: 1fr 1fr min-content ;
    grid-template-rows: 1fr min-content min-content min-content;
  `}

  div {
  }
`;

const Timage = styled.div`
  height: 10rem;
  grid-row: span 2;

  display: flex;
  align-items: center;
  justify-content: center;

  img {
    height: 100%;
  }

  ${respondTo.mobile`
    grid-row: 1/span 1;
    grid-column: 1/span 3;
  `}

  ${respondTo.lowTablet`
    grid-row: 1/span 1;
    grid-column: 1/span 3;
  `}

  ${respondTo.laptop`
    height:5rem;
  `}
`;

const Tname = styled.div`
  grid-column: 2 / span 2;
  padding: 1rem;
  text-align: left;

  ${respondTo.mobile`
    grid-row: 2/span 1;
    grid-column: 1/span 3;
  `}

  ${respondTo.lowTablet`
    grid-row: 2/span 1;
    grid-column: 1/span 3;
  `}
`;

const Tcolor = styled.div`
  display: flex;
  align-items: end;
  justify-content: end;
  grid-row: 2 / span 2;
  grid-column: 4;

  ${respondTo.mobile`
    grid-row: 4/span 1;
    grid-column: 3/span 1;
  `}

  ${respondTo.lowTablet`
    grid-row: 4/span 1;
    grid-column: 3/span 1;
  `}
`;

const Tsize = styled.div`
  grid-row: 2;
  grid-column: 2;
  padding-left: 1rem;

  display: flex;
  align-items: center;
  justify-content: start;

  ${respondTo.mobile`
    grid-row: 3/span 1;
    grid-column: 1/span 1;
  `}

  ${respondTo.lowTablet`
    grid-row: 3/span 1;
    grid-column: 1/span 1;
  `}
`;

const Tquantity = styled.div`
  grid-column: 1;
  grid-row: 3;

  ${respondTo.mobile`
    display:flex;
    align-items:center;
    justify-content:start;
    grid-row: 4/span 1;
    grid-column: 1/span 2;
  `}

  ${respondTo.lowTablet`
    display:flex;
    align-items:center;
    justify-content:start;
    grid-row: 4/span 1;
    grid-column: 1/span 2;
  `}
`;

const Tprice = styled.div`
  grid-row: 2;
  grid-column: 3;
  display: flex;
  align-items: center;
  justify-content: end;
  padding-right: 1rem;
  ${respondTo.mobile`
    padding-right:1rem;
    grid-row: 3/span 1;
    grid-column: 3/span 1;
  `}

  ${respondTo.lowTablet`
    padding-right:1rem;
    grid-row: 3/span 1;
    grid-column: 3/span 1;
  `}
`;

const Tdelete = styled.div`
  position: absolute;

  top: 0.5rem;
  right: 0.5rem;
  display: flex;
  align-items: start;
  justify-content: end;
`;

const IconContainer = styled.div`
  cursor: pointer;

  display: flex;
  padding: 0.5rem;
  align-items: center;
  justify-content: center;

  ${respondTo.mobile`
    cursor:default;
  `}

  ${respondTo.lowTablet`
    cursor:default;
  `}

  ${respondTo.tablet`
    cursor:default;
  `}

  ${respondTo.laptop`
    cursor:default;
  `}

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
function Product({ product, variant, cart, t }) {
  // Initialize hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <GridContainer>
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

      <Tdelete>
        <IconContainer onClick={() => dispatch(deleteCart({ id: cart.id }))}>
          <CloseSVG />
        </IconContainer>
      </Tdelete>

      {/* Product size */}
      <Tsize>{product.size}</Tsize>

      {/* Product variant quantity */}
      <Tquantity>
        <Form t={t} cart={cart} variant={variant} />
      </Tquantity>

      {/* Product price */}
      <Tprice>
        <Price product={product} />
      </Tprice>
    </GridContainer>
  );
}

export default Product;
