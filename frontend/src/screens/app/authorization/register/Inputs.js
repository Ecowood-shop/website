// components
import Page1 from "./Page1";
import Page2 from "./Page2";
import { LeftArrow, RightArrow } from "./Arrows";
import Button from "./Button";

function Inputs(props) {
  return (
    <>
      {props.loading ? (
        props.Loader
      ) : props.success ? (
        <p className={props.styles.registerSuccess}>Verify your E-mail</p>
      ) : (
        <>
          {props.nextPage ? (
            <LeftArrow pageChanger={props.pageChanger} styles={props.styles} />
          ) : (
            <RightArrow pageChanger={props.pageChanger} styles={props.styles} />
          )}
          <section>
            {props.nextPage ? (
              <Page1 styles={props.styles} />
            ) : (
              <Page2 styles={props.styles} />
            )}
          </section>
          <Button
            pageChanger={props.pageChanger}
            changer={props.changer}
            styles={props.styles}
            nextPage={props.nextPage}
            formik={props.formik}
          />
        </>
      )}
    </>
  );
}

export default Inputs;