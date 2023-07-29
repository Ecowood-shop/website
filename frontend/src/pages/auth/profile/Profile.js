// Import styled components
import { styled } from "styled-components";
import { respondTo } from "../../../utils/styles/_respondTo";
// Import components
import Details from "./components/Details";
import Orders from "./components/Orders";

// Import Hooks
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Main container
const Container = styled.div`
  display: flex;
  flex-direction: column;

  width: 80%;
  gap: 5rem;
  padding: 5rem 0;
  min-height: var(--height);

  ${respondTo.mobile`
    width:90%;
  `}
`;

// Export profile component
function Profile() {
  // Hooks
  const navigate = useNavigate();
  const { t } = useTranslation(["auth"]);

  return (
    <Container>
      <Details t={t} navigate={navigate} />
      <Orders t={t} navigate={navigate} />
    </Container>
  );
}

export default Profile;
