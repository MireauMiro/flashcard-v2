import React from "react";

function FormCard({ handleChange, formData }) {

  return (
    <>
      <label htmlFor="front">
        <textarea
          className="form-control"
          placeholder="Front:"
          id="front"
          type="text"
          name="front"
          onChange={handleChange}
          value={formData.front}
        />
      </label>
      <br />
      <label htmlFor="back">
        <textarea
          className="form-control"
          placeholder="Back:"
          id="back"
          type="text"
          name="back"
          onChange={handleChange}
          value={formData.back}
        />
      </label> 
      <br />
    </>
  );
}

export default FormCard;
