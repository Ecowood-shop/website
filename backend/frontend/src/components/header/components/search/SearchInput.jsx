// Import styled components
import { styled } from "styled-components";
// Import formik configuration
import FormikControl from "../../../formik/FormikControl";

// Search input
const Input = styled.div`
  & input {
    display: flex;
    height: 45px;
    width: 650px;
    max-width: 80vw;
  }
`;
// Export Search input container
const SearchInput = ({ t }) => {
  return (
    <Input>
      {/* Search input */}
      <FormikControl
        control="input"
        type="text"
        label="keyword"
        name="keyword"
        placeholder={t("header.search") + "..."}
      />
    </Input>
  );
};

export default SearchInput;
