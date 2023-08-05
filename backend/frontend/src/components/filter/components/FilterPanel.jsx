// Import styles
import styled from "styled-components";
import { respondTo } from "../../../utils/styles/_respondTo";
// Import components
import KeywordInput from "./KeywordInput";
import SubmitBtn from "./SubmitBtn";

// Import hooks
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Container
const Container = styled.div`
  position: relative;
  height: 4rem;
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 0.5rem 2rem 0.5rem 3rem;
  border-radius: 100px;
  background-image: var(--linear-primary);

  ${respondTo.mobile`
    height:auto;
    padding:0rem;
    flex-direction:column;

    background:transparent;
    border-radius:100px;
    border: 3px solid var(--darkmagenta);
  `}

  ${respondTo.lowTablet`
    height:auto;
    padding:0rem;
    flex-direction:column;

    background:transparent;
    border-radius:100px;
    border: 3px solid var(--darkmagenta);
  `}
`;

// Altax logo text
const HeaderText = styled.div`
  cursor: pointer;
  // Self position
  color: var(--white);
  font-size: var(--medium-m);
  transition: color 0.1s ease-in-out;

  &:hover {
    color: var(--whiteWithOpacity);
  }
  ${respondTo.mobile`
    display:none;
  `}

  ${respondTo.lowTablet`
    display:none;
  `}
`;

// Export product filter panel
function FilterPanel() {
  // Initializing hooks
  const navigate = useNavigate();

  const { t } = useTranslation(["components"]);

  return (
    <Container>
      <HeaderText onClick={() => navigate("/")}>Altax</HeaderText>
      <KeywordInput t={t} />

      <SubmitBtn />
    </Container>
  );
}

export default FilterPanel;
