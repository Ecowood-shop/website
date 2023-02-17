// components
import Phone from "./components/Phone";
import Gmail from "./components/Gmail";
import Address from "./components/Address";
import Schedule from "./components/Schedule";
import Location from "./components/Location";

export default function Section(props) {
  return (
    <section>
      <div className={props.styles.text}>
        <h2>{props.company.sectionName}</h2>
        <div>
          <Phone {...props} />
          <Gmail {...props} />
          <Address {...props} />
          <Schedule {...props} />
        </div>
      </div>
      <Location {...props} />
    </section>
  );
}
