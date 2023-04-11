
function Buttons({ styles, create, dispatch, id }) {
  return (
    <div className={styles.btnContainer}>
      <button type="submit" className={styles.button}>
        submit
      </button>
    </div>
  );
}

export default Buttons;
