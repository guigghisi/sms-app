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
        <h3>Cadastrar Matéria Prima</h3>
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-4">
            <label htmlFor="inputRawMaterial" className="formLabel">
              Nome
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
              placeholder="Nome da matéria prima"
              required
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="inputRawMaterialStocked" className="formLabel">
              Quantidade em estoque
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
              placeholder="Quantidade de matéria prima em estoque"
              required
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
