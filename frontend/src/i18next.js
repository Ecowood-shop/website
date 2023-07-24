// I18n
import i18n from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

// I18n setup
i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    backend: {
      // translation file path
      loadPath: `${window.location.pathname}locales/{{ns}}/{{lng}}.json`,
    },
    fallbackLng: "eng",
    load: "languageOnly",
    supportedLngs: ["eng", "geo", "rus"],
    // disabled in production
    debug: false,
    // can have multiple namespaces, in case you want to divide a huge
    // translation into smaller pieces and load them on demand
    ns: ["app", "components", "auth"],

    interpolation: {
      espaceValue: false,
      formatSeparator: ",",
    },
  });

export default i18n;
