const Shedule = (props) => (
  <span className={props.styles.work}>
    <h2>სამუშაო საათები</h2>
    <p> {props.company.shedule}</p>
  </span>
);

export default Shedule;
