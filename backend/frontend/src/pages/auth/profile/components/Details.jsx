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

const Text = styled.div`
  order: -1;
  display: flex;
  align-items: center;
  justify-content: center;

  color: var(--color-magenta);
  font-weight: bold;
  font-size: var(--large);
  text-transform: uppercase;
  text-shadow: var(--color-primary) 1px 0 10px;

  ${respondTo.desktop`
    order:0;
    flex-grow: 1;
    margin-left: auto;
  `}

  ${respondTo.tv`
    order:0;
    flex-grow: 1;
    margin-left: auto;
  `}
`;

// Export profile details component
function Details({ t, navigate }) {
  return (
    <Container className="w3-animate-right">
      <Profile t={t} navigate={navigate} />
      <Text>{t("profile.profile")}</Text>
    </Container>
  );
}

export default Details;
