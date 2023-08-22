// Import styles
import styled from "styled-components";
import { respondTo } from "../../../../../utils/styles/_respondTo";
// Import hooks
import { useNavigate } from "react-router-dom";

const GridContainer = styled.div`
  position: relative;

  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 1fr min-content min-content;

  gap: 10px;
  padding: 1rem;
  border-bottom: 0.1rem solid whitesmoke;

  ${respondTo.mobile`
   grid-template-columns: 1fr 1fr min-content ;
    grid-template-rows: 1fr min-content min-content min-content;
  `}

  ${respondTo.lowTablet`
    grid-template-columns: 1fr 1fr min-content ;
    grid-template-rows: 1fr min-content min-content min-content;
  `}
`;

const Timage = styled.div`
  height: 10rem;
  grid-column: 1;
  grid-row: span 2;

  display: flex;
  align-items: center;
  justify-content: center;

  img {
    height: 100%;
  }

  ${respondTo.mobile`
    grid-row: 1/span 1;
    grid-column: 1/span 4;
  `}

  ${respondTo.lowTablet`
    grid-row: 1/span 1;
    grid-column: 1/span 4;
  `}

  ${respondTo.laptop`
    height:5rem;
  `}
`;

const Tname = styled.div`
  grid-column: 2 / span 3;
  padding: 1rem;
  text-align: left;

  ${respondTo.mobile`
    padding:0;
    grid-row: 2;
    grid-column: 1/span 4;
  `}

  ${respondTo.lowTablet`
    padding:0;
    grid-row: 2;
    grid-column: 1/span 4;
  `}
`;

const Tcolor = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  grid-row: 2;
  grid-column: 3;

  ${respondTo.mobile`
    align-items: start;
    justify-content: start;

    grid-row: 4;
    grid-column: 1;
  `}

  ${respondTo.lowTablet`
    align-items: start;
    justify-content: start;

    grid-row: 4;
    grid-column: 1;
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
    padding:0;
    grid-row: 3;
    grid-column: 1;
  `}

  ${respondTo.lowTablet`
    padding:0;
    grid-row: 3;
    grid-column: 1;
  `}
`;

const Tquantity = styled.div`
  display: flex;
  align-items: end;
  justify-content: end;

  grid-column: 4;
  grid-row: 3;

  color: var(--darkmagenta);

  ${respondTo.mobile`
    display:flex;
    align-items:center;
    justify-content:start;

    grid-row: 4;
    grid-column: 4;
  `}

  ${respondTo.lowTablet`
    display:flex;
    align-items:center;
    justify-content:start;

    grid-row: 4;
    grid-column: 4;
  `};
`;

const Tprice = styled.div`
  display: flex;
  min-width: max-content;
  align-items: end;
  justify-content: end;

  grid-column: 4;
  grid-row: 2;

  ${respondTo.mobile`
    grid-row: 3;
    grid-column: 4;
  `}

  ${respondTo.lowTablet`
    grid-row: 3;
    grid-column: 4;
  `}
`;

// Export order product
function Product({ product, order, index, t }) {
  // Initialize hooks
  const navigate = useNavigate();

  return (
    <GridContainer>
      {/* Product image */}
      <Timage>
        <img
          src={product.image}
          onClick={() => navigate(`/product/${product.product}`)}
          alt={product.name}
        />
      </Timage>

      {/* Product name */}
      <Tname>{product.name}</Tname>

      {/* Product variant color */}
      <Tcolor>{order.variants[index].color} </Tcolor>

      {/* Product size */}
      <Tsize>{order.size[index].size}</Tsize>

      {/* Product price */}
      <Tprice>{product.price} ₾ </Tprice>

      {/* Product variant quantity */}
      <Tquantity>
        {product.qty} {product.qty > 1 ? t("global.items") : t("global.item")}
      </Tquantity>
    </GridContainer>
  );
}

export default Product;
