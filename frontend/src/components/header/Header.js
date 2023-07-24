// Import styled component
import styled from "styled-components";
import { respondTo } from "../../utils/styles/_respondTo";
// Import window dimensions
import useWindowDimensions from "../../utils/hooks/useWindowDimensions";

// Import components
import Navbar from "./desktop/Navbar";
import Topbar from "./desktop/Topbar";
import Menu from "./mobile/Menu";

// Main container
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  ${respondTo.desktop`
  background-image: var(--gradient-primary);`}
`;

function Header({ user }) {
  // Window dimensions
  const { width } = useWindowDimensions();

  return (
    <Container>
      {width > 1280 ? (
        <>
          <Topbar />
          <Navbar user={user} />
        </>
      ) : (
        <Menu user={user} />
      )}
    </Container>
  );
}

export default Header;
