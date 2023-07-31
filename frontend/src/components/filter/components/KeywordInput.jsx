// Import styles
import styled from "styled-components";
import { respondTo } from "../../../utils/styles/_respondTo";
// Import formik configuration
import FormikControl from "../../formik/FormikControl";

// Container
const Container = styled.div`
  display: flex;
  width: 30rem;
  max-width: 60%;
  height: 85%;

  ${respondTo.mobile`
    height:3rem;
    width:100%;
    max-width:100%;
  `}

  ${respondTo.lowTablet`
    height:3rem;
    width:100%;
    max-width:100%;
  `}

  ${respondTo.tablet`
    max-width:100%;
  `}

  & div {
    display: flex;

    input {
      padding-right: 1rem;
      border-radius: 100px;
      font-size: var(--small-m);
      display: flex;
      width: 100%;
      background-color: whitesmoke;
    }
  }
`;


// Export Search keyword input container
const KeywordInput = ({ t }) => {
  return (
    <Container>
      {/* Search keyword input */}
      <FormikControl
        control="input"
        type="text"
        label="keyword"
        name="keyword"
        placeholder={t("global.search") + "..."}
      />
    </Container>
  );
};

export default KeywordInput;
