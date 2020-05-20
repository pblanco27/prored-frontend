import React from "react";

function selectInput(props) {
  switch (props.type) {
    case "text":
      return (
        <input
          className="form-control"
          type="text"
          name={props.name}
          value={props.value}
          onChange={props.onChange}
        />
      );
    case "date":
      return (
        <input
          className="form-control"
          type="date"
          name={props.name}
          value={props.value}
          onChange={props.onChange}
        />
      );
    case "select":
      return (
        <select
          className="form-control"
          name={props.name}
          value={props.value}
          onChange={props.onChange}
        >
          {props.options.map((option, i) => {
            return (
              <option key={i} value={option.value}>
                {option.label}
              </option>
            );
          })}
        </select>
      );
    case "checkbox":
      return (
        <input
          type="checkbox"
          name={props.name}
          checked={props.checked}
          onChange={props.onChange}
        />
      );

    case "textarea":
      return (
        <textarea
          className="form-control"
          name={props.name}
          rows={props.rows}
          checked={props.checked}
          onChange={props.onChange}
        ></textarea>
      );
    default:
      break;
  }
}

export default function Input(props) {
  const input = selectInput(props);

  const erroDiv = props.idError ? (
    <div
      className="alert alert-danger"
      style={{ display: "none", fontSize: 12 }}
      id={props.idError}
    ></div>
  ) : null;

  return (
    <div className={`form-group ${props.required ? "required" : ""}`}>
      <label htmlFor={props.name}>{props.label}</label>
      {input}
      {erroDiv}
    </div>
  );
}
