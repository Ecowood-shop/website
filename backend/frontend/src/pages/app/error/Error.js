// OTHERS
import styles from "./styles.module.scss";
// translate
import { useTranslation } from "react-i18next";
function Error() {
  const { t } = useTranslation(["app"]);
  return (
    <section className={styles.container}>
      <div>
        <h1>Oops, something went wrong. </h1>
        <h2>
          {t("error.page not found")}
          
        </h2>
      </div>
    </section>
  );
}

export default Error;
