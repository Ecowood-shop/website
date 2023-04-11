import { useEffect, useState } from "react";
// i18next
import { useTranslation } from "react-i18next";
import i18next from "i18next";
// components
import Rus from "./svgs/Rus";
import Geo from "./svgs/Geo";
import Eng from "./svgs/Eng";
import Draggable from "react-draggable";
// styles
import styles from "./translate.module.scss";

function Translate() {
  const [open, setOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const { i18n } = useTranslation();

  let languages = i18n.options.supportedLngs;
  languages = languages
    .filter((item) => item !== i18n.language)
    .concat(i18n.language);

  useEffect(() => {
    if (localStorage.getItem("i18nextLng")?.length > 3) {
      i18next.changeLanguage("eng");
    }
  }, []);

  const handleStart = () => {
    setIsDragging(true);
  };

  const handleStop = () => {
    setTimeout(() => {
      setIsDragging(false);
    }, 100);
  };
  const handleLanguageChange = (language) => {
    if (!isDragging) {
      if (i18n.language !== language) {
        i18n.changeLanguage(language);
      }
      setOpen(!open);
    }
  };

  return (
    <Draggable onDrag={handleStart} onStop={handleStop}>
      <div className={styles.languagebox}>
        {languages.map((language, index) =>
          language !== "cimode" && (open || i18n.language === language) ? (
            <span key={language}>
              {language === "rus" && (
                <Rus
                  handleLanguageChange={handleLanguageChange}
                  styles={styles}
                />
              )}
              {language === "eng" && (
                <Eng
                  handleLanguageChange={handleLanguageChange}
                  styles={styles}
                />
              )}
              {language === "geo" && (
                <Geo
                  handleLanguageChange={handleLanguageChange}
                  styles={styles}
                />
              )}
            </span>
          ) : (
            <span key={index}></span>
          )
        )}
      </div>
    </Draggable>
  );
}

export default Translate;
