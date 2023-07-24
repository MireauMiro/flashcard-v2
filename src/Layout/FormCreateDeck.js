import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createDeck } from "../utils/api";
import FormDeck from "./FormDeck";

function FormCreateDeck() {

  const initialFormState = {
    name: "",
    description: "",
  };
  const [formData, setFormData] = useState({ ...initialFormState });
  const handleChange = ({ target }) => {
    const value = target.type === "checkbox" ? target.checked : target.value;
    setFormData({
      ...formData,
      [target.name]: value,
    });
  };
  const handleCreateSubmit = (event) => {
    event.preventDefault();
    const { name, description } = formData;
    createDeck({name, description});
    setFormData({ ...initialFormState });
  };

  return (
    <>
      <ol className="breadcrumb">
      <li className="breadcrumb-item"><Link to="/">Home</Link></li>
      <li className="breadcrumb-item active">Create Deck</li>
      </ol>
      <form name="create" onSubmit={handleCreateSubmit}>
        <FormDeck handleChange={handleChange} formData={formData} />
        <button type="submit" className="btn btn-primary">Create Deck</button>
      </form>
    </>
  )
}

export default FormCreateDeck;
