// Import styles
import styled from "styled-components";
import { respondTo } from "../../../../../utils/styles/_respondTo";
// Import hooks
import { useNavigate } from "react-router-dom";

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
  cursor: pointer;
  max-width: 0;
  padding: 1rem;
  text-align: left;
`;

const Tcolor = styled.td`
  text-align: center;
`;
const Tquantity = styled.td`
  text-align: center;
  color: var(--darkmagenta) !important;
`;

const Tsize = styled.td`
  width: auto;
  padding: 0 1rem;
  text-align: center;
  white-space: nowrap;
`;

const Tprice = styled.td`
  padding: 0 1rem;
  text-align: center;
  min-width: max-content;
`;

// Export product component
function Product({ product, order, index, t }) {
  // Initialize hooks
  const navigate = useNavigate();

  return (
    <>
      {/* Product image */}
      <Timage>
        <img
          src={product.image}
          onClick={() => navigate(`/product/${product.product}`)}
          alt={product.name}
        />
      </Timage>

      {/* Product name */}
      <Tname onClick={() => navigate(`/product/${product.product}`)}>
        {product.name}
      </Tname>

      {/* Product variant color */}
      <Tcolor>{order.variants[index].color}</Tcolor>

      {/* Product size */}
      <Tsize>{order.size[index].size}</Tsize>

      {/* Product price */}
      <Tprice>{product.price} ₾</Tprice>

      {/* Product variant quantity */}
      <Tquantity>
        {product.qty} {product.qty > 1 ? t("global.items") : t("global.item")}
      </Tquantity>
    </>
  );
}

export default Product;
