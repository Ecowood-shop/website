// Import styled components
import { styled } from "styled-components";
import { respondTo } from "../../../../utils/styles/_respondTo";
// Import components
import Profile from "./Profile";

const Container = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;
  gap: 3rem;

  ${respondTo.desktop`
    flex-direction:row;
  `}

  ${respondTo.tv`
    flex-direction:row;
  `}
`;

// Export profile details component
function Details({ t, navigate }) {
  return (
    <Container className="w3-animate-right">
      <Profile t={t} navigate={navigate} />
    </Container>
  );
}

export default Details;
