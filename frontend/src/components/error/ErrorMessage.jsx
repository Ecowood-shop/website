// Import styles
import styled from "styled-components";
import { ErrorSVG } from "../../static/icons/components";

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TextContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  padding: 0rem 1rem;

  border-radius: 100px;
  background-image: var(--gradient-secondary);
`;

const Text = styled.h3`
  color: var(--white);
  font-size: var(--small-l);
  text-transform: lowercase;

  &::first-letter {
    text-transform: capitalize;
  }
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.5rem;
`;

// Export error message container component
function ErrorMessage({ children }) {
  return (
    <Container>
      <TextContainer>
        <IconContainer>
          <ErrorSVG />
        </IconContainer>
        <Text>{children}</Text>
      </TextContainer>
    </Container>
  );
}

export default ErrorMessage;
