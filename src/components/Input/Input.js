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
          disabled={props.disable}
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
          disabled={props.disable}
        />
      );
    case "select":
      return (
        <select
          className="form-control"
          name={props.name}
          value={props.value}
          onChange={props.onChange}
          disabled={props.disable}
        >
          {props.options.map((option, i) => {
            return (
              <option
                key={i}
                value={option.value}
                disabled={option.disable ? true : false}
              >
                {option.label}
              </option>
            );
          })}
        </select>
      );
    case "checkbox":
      return (
        <>
          <br />
          <input
            type="checkbox"
            name={props.name}
            checked={props.checked}
            onChange={props.onChange}
            disabled={props.disable}
          />
        </>
      );
    case "textarea":
      return (
        <textarea
          className="form-control"
          name={props.name}
          rows={props.rows}
          value={props.value}
          onChange={props.onChange}
          disabled={props.disable}
        ></textarea>
      );
    case "file":
      return (
        <input
          className="form-control"
          type="file"
          id={props.name} // Necesario para el label
          name={props.name}
          style={{ display: "none" }}
          onChange={props.onChange}
        />
      );
    default:
      return null;
  }
}

export default function Input(props) {
  const input = selectInput(props);

  const errorDiv = props.idError ? (
    <div
      className="alert alert-danger"
      style={{ display: "none", fontSize: 12 }}
      id={props.idError}
    ></div>
  ) : null;

  return (
    <div className={`form-group ${props.required ? "required" : ""}`}>
      <label
        className={props.className ? props.className : ""}
        htmlFor={props.name}
      >
        {props.label}
      </label>

      {input}
      {props.loadedFile ? props.loadedFile : null}
      {errorDiv}
    </div>
  );
}
