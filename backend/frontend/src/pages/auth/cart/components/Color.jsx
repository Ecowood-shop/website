// Import styles
import styled from "styled-components";
// Import components
import ColorPicker from "../../../../components/colorPicker/color/Color";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 2rem;
`;

// Export product color for cart products
function Color({ variant, t }) {
  return (
    <Container>
      {variant?.color.toLowerCase() !== "default" && (
        <ColorPicker element={variant} />
      )}
    </Container>
  );
}

export default Color;
