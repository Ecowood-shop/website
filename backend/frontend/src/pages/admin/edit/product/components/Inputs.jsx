// import styles
import { styled } from "styled-components";
import { respondTo } from "../../../../../utils/styles/_respondTo";

// import components
import Name from "./Name";
import Size from "./Size";
import Brand from "./Brand";
import Details from "./Details";
import Discount from "./Discount";

const Container = styled.div`
  width: 100%;
  display: grid;
  max-width: 80vw;

  grid-gap: 3rem;
  grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));

  ${respondTo.tablet`
      grid-template-columns: repeat(2, 1fr);
  `}

  & > div {
    margin: 0.5rem 0;
  }

  input {
    max-width: 80vw;
    width: 100%;
    padding: 0.5rem 2rem;

    border-radius: 20px;
    font-size: var(--small-l);
    background-color: whitesmoke;

    ${respondTo.mobile`
      background-color:white;
    `}

    ${respondTo.lowTablet`
      background-color:white;
    `}
  }
`;

function Inputs({ categories, formik, t }) {
  return (
    <Container>
      {/* product name */}
      <Name t={t} />

      {/* product brand */}
      <Brand t={t} />

      {/* product size */}
      <Size t={t} />

      {/* additional details */}
      <Details t={t} categories={categories} />

      {/* discount */}
      <Discount t={t} formik={formik} />
    </Container>
  );
}

export default Inputs;
