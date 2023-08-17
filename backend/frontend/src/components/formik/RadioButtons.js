import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";

function RadioButtons(props) {
  const { label, name, options, ...rest } = props;
  return (
    <>
      <Field name={name}>
        {({ field }) => {
          return options.map((option) => {
            return (
              <React.Fragment key={option.key}>
                <input
                  type="radio"
                  id={option.key}
                  {...field}
                  {...rest}
                  value={option.value}
                  checked={field.value === option.value}
                />
                {option.label}
              </React.Fragment>
            );
          });
        }}
      </Field>
    </>
  );
}

export default RadioButtons;
