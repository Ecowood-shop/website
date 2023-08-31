import React from "react";
import { useState, useEffect } from "react";
import { ErrorMessage } from "formik";
import TextError from "./TextError";
import Select from "react-select";

function AutoComplete(props) {
  const { name, options, ...rest } = props;

  const [customOptions, setOptions] = useState(options);

  const defaultValue = (options, value) => {
    return options ? options.find((option) => option.value === value) : "";
  };

  useEffect(() => {
    setOptions(options);
  }, [options]);

  const { values, setFieldValue } = props.formik;
  return (
    <div className="form-control" {...rest}>
      <Select
        {...rest}
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
