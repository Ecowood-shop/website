const Location = (props) => (
  <iframe
    className={props.styles.iframe}
    src={props.company.location}
    allowFullScreen=""
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  ></iframe>
);

export default Location;
