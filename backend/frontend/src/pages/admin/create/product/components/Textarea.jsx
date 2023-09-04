// import styles
import { styled } from "styled-components";
import { respondTo } from "../../../../../utils/styles/_respondTo";

// import components
import SafetyStandards from "./SafetyStandards";
import InstructionForUse from "./InstructionForUse";
import TechnicalRequirements from "./TechnicalRequirements";

const Container = styled.div`
  display: grid;
  width: 100%;
  max-width: 80vw;

  grid-gap: 3rem;
  grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));

  ${respondTo.tablet`
      grid-template-columns: repeat(2, 1fr);
  `}

  & > div {
    margin: 0.5rem 0;
  }

  textarea {
    width: 100%;
    height: 15rem;
    max-width: 80vw;
    padding: 0.5rem 1rem;

    border: none;
    border-radius: 20px;

    text-align: start;
    font-size: var(--small-l);
    background-color: whitesmoke;

    ${respondTo.mobile`
      background-color:white;
    `}

    ${respondTo.lowTablet`
      background-color:white;
    `}
  }
`;

function Textarea({ t }) {
  return (
    <Container>
      {/* technical requirements */}
      <TechnicalRequirements t={t} />

      {/* instruction for use */}
      <InstructionForUse t={t} />

      {/*safety standards */}
      <SafetyStandards t={t} />
    </Container>
  );
}

export default Textarea;
