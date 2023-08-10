// Import styled components
import { styled } from "styled-components";
import { Language, IconContainer } from "./style";
// Import i18next
import i18next from "i18next";

// Dropdown container
const DropdownContainer = styled.div`
  z-index: 1;
  display: none;
  bottom: 4px;
  &:hover {
    display: flex;
  }
`;

// Dropdown
const DropDown = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  left: 50%;
  transform: translateX(-50%);

  // Styles
  border-radius: 20px;
  background-color:var(--secondary)
`;

// Export dropdown component
function Dropdown({ languages }) {
  return (
    <DropdownContainer className="w3-animate-top">
      <DropDown>
        {/* Map all languages */}
        {languages.map((language) => (
          <Language
            key={language.lang}
            onClick={() => i18next.changeLanguage(language.lang)}
          >
            <IconContainer>
              <language.icon />
            </IconContainer>
            {language.lang}
          </Language>
        ))}
      </DropDown>
    </DropdownContainer>
  );
}

export default Dropdown;
