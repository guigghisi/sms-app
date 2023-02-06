import Header from "../components/Header";
import { useState } from "react";
import api from "../service/api";

export default function RegisterRawMaterial() {
  const [formContent, setFormContent] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();

    api
      .post("/raw-materials", {
        name: formContent.rawMaterialName,
        stocked: formContent.rawMaterialStocked,
      })
      .then((response) => console.log(response));
  };
  return (
    <div className="mb-3">
      <Header />
      <div className="container">
        <h3>Register Raw Material</h3>
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-4">
            <label htmlFor="inputRawMaterial" className="formLabel">
              Name
            </label>
            <input
              value={formContent.rawMaterial}
              onChange={(event) => {
                setFormContent((prevState) => ({
                  ...prevState,
                  rawMaterialName: event.target.value,
                }));
              }}
              type="text"
              className="form-control"
              id="inputRawMaterial"
              placeholder="Name of the raw material"
              required
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="inputRawMaterialStocked" className="formLabel">
              Quantity in stock
            </label>
            <input
              value={formContent.rawMaterialStocked}
              onChange={(event) => {
                setFormContent((prevState) => ({
                  ...prevState,
                  rawMaterialStocked: event.target.value,
                }));
              }}
              type="number"
              className="form-control"
              id="inputRawMaterialStocked"
              placeholder="Quantity of raw material in stock"
              required
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
