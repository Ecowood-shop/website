// Import styles
import { styled } from "styled-components";
import { respondTo } from "../../../utils/styles/_respondTo";
// Import components
import { Phone, Gmail, Address, Schedule, Location } from "./components";
// Import icons
import { RombSVG } from "../../../static/icons/components";

const Container = styled.div`
  display: flex;
  margin: 1rem 0 3rem 0;
  flex-direction: column;

  display: grid;
  ${respondTo.desktop`
    gap: 1rem;
    grid-template-columns: 1fr 1fr;
  `}

  ${respondTo.tv`
    gap: 1rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
  `}
`;

const InnerContainer = styled.div`
  display: flex;
  margin: 0 2rem;
  align-items: center;
  flex-direction: column;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  display: grid;
  grid-template-columns: 1fr 1fr;

  ${respondTo.mobile`
    grid-template-columns:1fr;
  `}
`;

const Header = styled.div`
  display: flex;
  margin-bottom: 1rem;
  text-transform: capitalize;
  font-size: calc(var(--medium-s) + 0.2rem);

  ${respondTo.mobile`
    width:100%;
    margin-right:1.5rem;
    margin-bottom:0rem;
    font-size: calc(var(--medium-s) + 0.2rem);
  `}

  ${respondTo.lowTablet`
    font-size:var(--medium-s);
  `}
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.4rem 0.7rem;
  svg {
    margin-bottom: 0.1rem;
    width: var(--medium-s);
    height: var(--medium-s);
    transform: rotateZ(100deg) skewY(10deg) skewX(10deg);

    path {
      fill: var(--color-primary);
    }
  }
`;
// Export section component
export default function Section(props) {
  return (
    <Container>
      <InnerContainer>
        <Header>
          <IconContainer>
            <RombSVG />
          </IconContainer>
          {props.company.sectionName}
        </Header>

        <Content>
          <Phone {...props} />
          <Gmail {...props} />
          <Address {...props} />
        </Content>

        <Schedule {...props} />
      </InnerContainer>

      <Location {...props} />
    </Container>
  );
}
