// Import navigate
import { useNavigate } from "react-router-dom";

// Import components
import { Container, Link } from "../components/topBar/style";
import Translate from "../components/topBar/Translate";

// Import translate
import { useTranslation } from "react-i18next";
// Import svgs
import { PhoneSVG } from "../../../static/icons/components";

// Export top bar
function Topbar() {

  // Hooks
  const navigate = useNavigate();
  const { t, i18n } = useTranslation(["components"]);

  return (
    <Container className="w3-animate-right">
      <Link>
        <p>{t("header.hotline")} </p>
        <PhoneSVG />
        <p> 555 55 55 55 </p>
      </Link>
      <Link onClick={() => navigate("/about-us#branches")}>
        {t("header.branches")}
      </Link>
      <Link $lowercase>
        <a href="https://ecowood.ge/" target="_blank" rel="noopener noreferrer">
          www.ecowood.ge
        </a>
      </Link>
      <Link $translate>
        <Translate i18n={i18n} t={t} />
      </Link>
    </Container>
  );
}

export default Topbar;
