// Import styled components
import { styled } from "styled-components";
import { DropDown, Item, IconContainer } from "./style";

// Import icons
import { languageIcons } from "../../../../static/icons";
import { useState } from "react";

// Import i18next
import i18next from "i18next";

// Main container
const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

// Export translate component
function Translate({ i18n, closeMenu }) {
  //  Destructure icons
  const { GeorgianSVG, EnglishSVG, RussianSVG } = languageIcons;

  const [isOpen, setIsOpen] = useState(false);
  const languages = [
    { lang: "geo", icon: GeorgianSVG },
    { lang: "eng", icon: EnglishSVG },
    { lang: "rus", icon: RussianSVG },
  ];

  const selectedLanguage = languages.find(
    (language) => language.lang === i18n.language
  );

  const languageChanger = (lang) => {
    i18next.changeLanguage(lang);
    closeMenu();
  };
  return (
    <Container>
      {/* Selected language */}
      <Item $left onClick={() => setIsOpen(!isOpen)}>
        <IconContainer>
          <selectedLanguage.icon />
        </IconContainer>
        {selectedLanguage.lang}
      </Item>

      {/* Dropdown component */}
      {isOpen && (
        <DropDown className="w3-animate-right">
          {/* <Dropdown languages={languages} /> */}
          {languages.map((language) => (
            <Item
              key={language.lang}
              onClick={() => languageChanger(language.lang)}
            >
              <IconContainer>
                <language.icon />
              </IconContainer>
              {language.lang}
            </Item>
          ))}
        </DropDown>
      )}
    </Container>
  );
}

export default Translate;
