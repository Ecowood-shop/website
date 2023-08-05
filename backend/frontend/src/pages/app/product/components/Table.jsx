// Import styles
import { styled } from "styled-components";
import { respondTo } from "../../../../utils/styles/_respondTo";

// Import components
import Form from "./table/Form";
import Discount from "./table/Discount";
import Gallery from "./gallery/Gallery";
import Calculator from "./table/Calculator";
import Description from "./table/Description";

const Container = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 0 5rem 0;
  flex-direction: column;

  ${respondTo.laptop`
    flex-direction:row;
    align-items: stretch;
    
    border-radius: 10px;
    background-color: white;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px,
      rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;
  `}

  ${respondTo.desktop`
    gap:5rem;
    flex-direction:row;
    align-items:center;
`}
`;

const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  margin: 3rem 0;
  position: relative;
  height: fit-content;

  align-items: center;
  flex-direction: column;
  justify-content: center;

  ${respondTo.laptop`
    width:80%;
    padding: 0 2rem;
    
    box-shadow:none;
    background:transparent;
  `}

  ${respondTo.desktop`
    width:40%;
    margin-left: auto;
    padding: 2rem 3rem;

    border-radius: 10px;
    background-color: white;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px,
    rgba(0, 0, 0, 0.3) 0px 18px 36px -18px;
  `}
`;

// Export table
function Table({ product, variants, t }) {
  return (
    <Container className="w3-animate-right">
      {/* Gallery */}
      <Gallery product={product} t={t} />

      {/* Content */}
      <InnerContainer>
        <Discount product={product} />
        <Description product={product} t={t} />
        <Form product={product} variants={variants} t={t} />
        <Calculator product={product} t={t} />
      </InnerContainer>
    </Container>
  );
}

export default Table;
