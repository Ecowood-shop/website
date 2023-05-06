function Buttons({ styles, t }) {
  return (
    <div className={styles.btnContainer}>
      <button type="submit" className={styles.button}>
        {t("global.submit")}
      </button>
    </div>
  );
}

export default Buttons;
