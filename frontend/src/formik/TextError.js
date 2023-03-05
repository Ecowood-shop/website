// styles
import styles from "./styles/styles.module.scss";
function TextError(props) {
  return <div className={styles.error}>{props.children}</div>;
}

export default TextError;
