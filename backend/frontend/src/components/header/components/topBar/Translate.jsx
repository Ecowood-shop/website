// Import styled components
import { styled } from "styled-components";
import { IconContainer, Language } from "./style";

// Import icons
import { languageIcons } from "../../../../static/icons";

// Import components
import Dropdown from "./Dropdown";

// Container component
const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  &:hover {
    & div {
      display: flex;
    }
  }
`;

function Translate({ i18n, t }) {
  //  Destructure icons
  const { GeorgianSVG, EnglishSVG, RussianSVG } = languageIcons;

  const languages = [
    { lang: "geo", icon: GeorgianSVG },
    { lang: "eng", icon: EnglishSVG },
    { lang: "rus", icon: RussianSVG },
  ];

  const selectedLanguage = languages.find(
    (language) => language.lang === i18n.language
  );

  return (
    <Container>
      {/* Selected language */}
      <Language>
        <IconContainer>
          <selectedLanguage.icon />
        </IconContainer>
        {selectedLanguage.lang}
      </Language>

      {/* Dropdown component */}
      <Dropdown languages={languages} />
    </Container>
  );
}

export default Translate;
