// Import styled component
import styled from "styled-components";
import "react-multi-carousel/lib/styles.css";
import { respondTo } from "../../utils/styles/_respondTo";
// Import components
import Product from "./components/Product";
import ReactCarousel from "react-multi-carousel";
import { responsive } from "./components/responsive";

// Import Hooks
import { useNavigate } from "react-router-dom";

// Main container
const Container = styled.div`
  border-radius: 10px;
  background-color: whitesmoke;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px,
    rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;
`;

// Header
const Header = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 10px 10px 0 0;

  text-align: center;
  color: var(--white);
  background: var(--linear-primary);

  ${respondTo.desktop`
    cursor:pointer;
  `}
`;

const HeaderText = styled.h3`
  font-size: var(--medium-s);
`;

// Export carousel components
function Carousel(props) {
  // Hooks
  const navigate = useNavigate();

  return (
    <Container className="w3-animate-right">
      {/* Header container */}
      <Header>
        <HeaderText
          onClick={() => {
            navigate("/products/search?category=" + props.category.category);
          }}
        >
          {props.category.category}
        </HeaderText>
      </Header>

      {/* React carousel */}
      <ReactCarousel responsive={responsive}>
        {props.products &&
          props.products.map((productObject) => (
            <Product
              key={productObject.product._id}
              product={productObject.product}
            />
          ))}
      </ReactCarousel>
    </Container>
  );
}

export default Carousel;
