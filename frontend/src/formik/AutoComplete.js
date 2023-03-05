import React from "react";
import { useState } from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";
import Select from "react-select";

function AutoComplete(props) {
  const { name, options, ...rest } = props;

  const [customOptions, setOptions] = useState(options);

  const defaultValue = (options, value) => {
    return options ? options.find((option) => option.value === value) : "";
  };

  const { values, setFieldValue } = props.formik;

  console.log(customOptions);
  return (
    <div className="form-control" { ...rest} >
      <Select { ...rest}
        value={defaultValue(customOptions, values[name])}
        options={customOptions}
        name={name}
        onChange={(newValue) => setFieldValue(name, newValue.value)}

      />

      <ErrorMessage component={TextError} name={name} />
    </div>
  );
}

export default AutoComplete;
