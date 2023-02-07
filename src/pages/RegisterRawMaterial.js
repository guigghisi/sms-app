import Header from "../components/Header";
import { useEffect, useState } from "react";
import api from "../service/api";
import RawMaterialItem from "../components/RawMaterialItem";

export default function RegisterRawMaterial() {
  const [formContent, setFormContent] = useState({});
  const [rawMaterials, setRawMaterials] = useState([]);

  const handleSubmit = (event) => {
    api
      .post("/raw-materials", {
        name: formContent.rawMaterialName,
        stocked: formContent.rawMaterialStocked,
      })
      .then((response) => console.log(response));
    document.querySelector("#inputRawMaterial").value = "";
    document.querySelector("#inputRawMaterialStocked").value = 0;
  };

  useEffect(() => {
    api
      .get("/raw-materials")
      .then((response) => setRawMaterials(response.data));
  }, []);
  return (
    <div>
      <Header />
      <div className="container">
        <h3>Cadastrar Matéria Prima</h3>
        <form
          className="row row-cols-lg-auto g-3 align-items-end justify-content-center"
          onSubmit={handleSubmit}
        >
          <div className="col-12">
            <label htmlFor="inputRawMaterial" className="formLabel">
              Matéria prima
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
          <div className="col-12">
            <label htmlFor="inputRawMaterialStocked" className="formLabel">
              Quantidade em estoque
            </label>
            <input
              value={formContent.rawMaterialStocked}
              onChange={(event) => {
                setFormContent((prevState) => ({
                  ...prevState,
                  rawMaterialStocked: Math.max(0, event.target.value),
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
            <button type="submit" className="btn btn-success">
              Cadastrar
            </button>
          </div>
          <div className="col-12">
            <button type="reset" className="btn btn-secondary">
              Limpar
            </button>
          </div>
        </form>
      </div>
      <div className="container">
        <h3>Matérias Primas</h3>
        <div className="container">
          <div className="row">
            <div className="col-4">
              <h4>Matéria prima</h4>
            </div>
            <div className="col-4">
              <h4>Quantidade em estoque</h4>
            </div>
            <div className="col-4">
              <h4>Ações</h4>
            </div>
          </div>
          {rawMaterials.map((rawMaterial) => (
            <RawMaterialItem prop={rawMaterial} />
          ))}
        </div>
      </div>
    </div>
  );
}
