import React from "react";
import classes from "./Input.css";

const input = (props) => {
  const inputClasses = [classes.InputElement];
  if (props.invalid && props.isTouched) {
    inputClasses.push(classes.Invalid);
  }

  let inputElement = null;
  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;

    case "textarea":
      inputElement = (
        <textarea
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;

    case "select":
      inputElement = (
        <select
          onChange={props.changed}
          className={classes.InputElement}
          value={props.value}
        >
          {props.elementConfig.options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.displayValue}
            </option>
          ))}
        </select>
      );
      break;

    default:
      inputElement = (
        <input
          onChange={props.changed}
          className={classes.InputElement}
          {...props.elementConfig}
          value={props.value}
        />
      );
  }
  return (
    <div className={classes.Input}>
      <label>{props.lable}</label>
      {inputElement}
    </div>
  );
};

export default input;
