// Import styles
import { styled } from "styled-components";

const Container = styled.div``;

const Header = styled.div`
  text-align: center;
`;

const HeaderText = styled.h1`
  color: var(--black);
  font-size: var(--medium-s);
`;

const Hr = styled.hr`
  border-color: var(--black);
`;
const TextContainer = styled.ol`
  margin-left: 1rem;
  list-style: circle;
`;

const Text = styled.li`
  font-size: var(--small-l);
  &::first-letter {
    text-transform: capitalize;
  }
`;

// Export shipping method details
function Details({ t }) {
  return (
    <Container>
      <Header>
        <HeaderText>{t("shipping method.shipping methods")}</HeaderText>
      </Header>
      <Hr />

      <TextContainer>
        <Text>
          {t("shipping method.delivery across Tbilisi in 2-4 working days")}
        </Text>
        <Text>
          {t(
            "shipping method.delivery to regions will be made in 4-5 working days"
          )}
        </Text>
      </TextContainer>
    </Container>
  );
}

export default Details;
