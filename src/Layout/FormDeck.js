import React from "react";

function FormDeck({ handleChange, formData }) {

  return (
    <>
      <label htmlFor="name">
        <input
          className="form-control"
          placeholder="Name:"
          id="name"
          type="text"
          name="name"
          onChange={handleChange}
          value={formData.name}
        />
      </label>
      <br />
      <label htmlFor="description">
        <textarea
          className="form-control"
          placeholder="Description:"
          id="description"
          type="text"
          name="description"
          onChange={handleChange}
          value={formData.description}
        />
      </label>
      <br />
    </>
  );
}

export default FormDeck;
