// Import styles
import styled from "styled-components";
import { respondTo } from "../../../utils/styles/_respondTo";
// Import components
import PriceSelect from "./PriceSelect";
import CategorySelect from "./CategorySelect";

// Main Container
const Container = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;

  ${respondTo.mobile`
    margin-left: 0;
  `}

  ${respondTo.lowTablet`
    margin-left: 0;
  `}
`;

// Container that holds selects
const InnerContainer = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  gap: 2rem;
  padding: 1rem 0;

  ${respondTo.mobile`
    gap:1rem;
    width:100%;
  `}

  ${respondTo.lowTablet`
    gap:1rem;
    width:100%;
  `}
`;

// Export select panel which contains category and price selects
function SelectPanel() {
  return (
    <Container>
      <InnerContainer>
        <CategorySelect />
        <PriceSelect />
      </InnerContainer>
    </Container>
  );
}

export default SelectPanel;
