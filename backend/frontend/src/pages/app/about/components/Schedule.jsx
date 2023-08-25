// Import styles
import { styled } from "styled-components";
import { respondTo } from "../../../../utils/styles/_respondTo";

const Container = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 1rem;
  flex-direction: column;

  ${respondTo.desktop`
    margin-bottom: 0;    
  `}

  ${respondTo.tv`
    margin-bottom: 0;    
  `}
`;

const Header = styled.h3`
  text-align: center;
  color: var(--black);
  font-size: calc(var(--medium-s) - 0.2rem);

  text-transform: capitalize;
  border-bottom: 1px solid black;
`;

const Text = styled.p`
  text-align: center;
  color: var(--black);
  font-size: var(--small-l);
`;

// Export  schedule component
const Schedule = (props) => (
  <Container>
    <Header>{props.company.workingHours}</Header>
    <Text> {props.company.shedule}</Text>
  </Container>
);

export default Schedule;
