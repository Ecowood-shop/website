// Import styled component
import styled from "styled-components";
import { respondTo } from "../../../utils/styles/_respondTo";
// Import helper functions
import { getMainImage } from "../../../utils/helpers/getMainImage";

const Container = styled.div`
  ${respondTo.desktop`
    cursor:pointer;
  `}
  height: 16rem;
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;

  margin: 2rem 1rem;
  border-radius: 10px;
  background-color: white;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px,
    rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;

  overflow: hidden;

  color: rgb(11, 11, 11);

  & div:first-child:hover + div:last-child {
    display: none;
  }
`;

const ImageContainer = styled.div`
  max-width: 20%;
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease-in;

  img {
    height: 100%;
  }

  &:hover {
    max-width: 100%;
    height: 100%;
  }
`;

const DiscountContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  background-color: var(--color-primary);
  font-size: var(--small-l);
  color: white;
  z-index: 100;
  border-bottom-left-radius: 10px;
  padding: 0.5rem 1rem;
`;

const InnerContainer = styled.div`
  width: 80%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const HeaderText = styled.h3`
  font-size: var(--small-l);

  overflow: hidden;
  text-align: center;
  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: auto;
`;

const Size = styled.p`
  margin: 0;
  font-size: var(--small-m);
`;

const Price = styled.p`
  position: relative;
  margin-left: auto;
  bottom: 0.5rem;
  font-size: var(--small-l);
  i {
    text-decoration: line-through;
    color: var(--color-error);
    margin-right: 0.6rem;
  }
`;
// Export product component
function Product({ product, navigate }) {
  return (
    <Container onClick={() => navigate(`/product/${product._id}`)}>
      {product?.discount && parseFloat(product?.discount.percentage) > 0 && (
        <DiscountContainer>
          -{parseFloat(product.discount.percentage)}%
        </DiscountContainer>
      )}

      {/* Product image */}
      <ImageContainer>
        <img src={getMainImage(product)} alt={product.name_geo} />
      </ImageContainer>

      {/* Product description */}
      <InnerContainer>
        <HeaderText>{product.name_geo}</HeaderText>
        <Body>
          <Size>{product.size}</Size>
          <Price>
            {product?.discount &&
            parseFloat(product?.discount.percentage) > 0 ? (
              <>
                <i> {product.price}</i>
                {(
                  parseFloat(product.price) -
                  (parseFloat(product.price) *
                    parseFloat(product.discount.percentage)) /
                    100
                ).toFixed(2)}{" "}
                ₾
              </>
            ) : (
              <>{product.price} ₾</>
            )}
          </Price>
        </Body>
      </InnerContainer>
    </Container>
  );
}

export default Product;
