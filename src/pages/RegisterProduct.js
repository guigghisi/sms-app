import Header from "../components/Header";
import React, { useEffect, useState } from "react";
import api from "../service/api";

export default function RegisterProduct() {
  const [formContent, setFormContent] = useState({});
  const [rawMaterialsApi, setRawMaterialsApiApi] = useState([]);
  const [rawMaterial, setRawMaterial] = useState([]);

  useEffect(() => {
    api
      .get("/raw-materials")
      .then((response) => setRawMaterialsApiApi(response.data));
  }, []);

  useEffect(() => {
    document.querySelector("#tableRawMaterial").innerHTML = `
        <tr>
            <th>Matéria prima</th>
            <th>Quantidade</th>
        </tr>
        `;
    rawMaterial.map((rawMaterial) => {
      document.querySelector("#tableRawMaterial").innerHTML += `
        <tr>
            <td>${rawMaterial.name}</td>
            <td>${rawMaterial.quantity}</td>
        </tr>
        `;
    });
  }, [rawMaterial]);

  const handleSubmit = (event) => {
    event.preventDefault();
    let rawMaterials = [];
    rawMaterial.map((rawMaterial) => {
      for (let i = 0; i < rawMaterial.quantity; i++) {
        rawMaterials.push({
          id: rawMaterial.id,
          name: rawMaterial.name,
        });
      }
    });
    api.post("/products", {
      name: formContent.productName,
      price: formContent.productPrice,
      rawMaterials: rawMaterials,
    });
  };
  return (
    <div className="mb-3">
      <Header />
      <div className="container">
        <div className="flex">
          <h3>Cadastrar Produto</h3>
          <form className="row g-3" onSubmit={handleSubmit}>
            <div className="col-md-3">
              <label htmlFor="inputProductName" className="formLabel">
                Nome
              </label>
              <input
                value={formContent.productName}
                onChange={(event) => {
                  setFormContent((prevState) => ({
                    ...prevState,
                    productName: event.target.value,
                  }));
                }}
                type="text"
                className="form-control"
                id="inputProductName"
                placeholder="Nome do produto"
                required
              />
            </div>
            <div className="col-md-2">
              <label htmlFor="inputProductPrice" className="formLabel">
                Preço
              </label>
              <input
                value={formContent.productPrice}
                onChange={(event) => {
                  setFormContent((prevState) => ({
                    ...prevState,
                    productPrice: event.target.value,
                  }));
                }}
                type="text"
                className="form-control"
                id="inputProductPrice"
                placeholder="R$"
                required
              />
            </div>

            <div className="col-md-5">
              <label htmlFor="selectRawMaterial" className="formLabel">
                Matéria Prima
              </label>
              <div
                className="input-group col-md-4
           "
              >
                <select
                  className="form-select "
                  id="selectRawMaterial"
                  aria-label="Default select example"
                >
                  <option selected>Selecione uma matéria prima</option>
                  {rawMaterialsApi.map((rawMaterial) => (
                    <option value={rawMaterial.id}>{rawMaterial.name}</option>
                  ))}
                </select>
                <input
                  type="number"
                  className="form-control"
                  id="inputRawMaterialQuantity"
                  placeholder="Quantidade"
                />
                <button
                  className="btn btn-primary"
                  type="button"
                  id="button-addon2"
                  onClick={() => {
                    setRawMaterial((prevState) => [
                      ...prevState,
                      {
                        id: document.querySelector("#selectRawMaterial").value,
                        name: document.querySelector(
                          "#selectRawMaterial option:checked"
                        ).innerText,
                        quantity: document.querySelector(
                          "#inputRawMaterialQuantity"
                        ).value,
                      },
                    ]);
                  }}
                >
                  Adicionar
                </button>
                <div>
                  <button type="submit" className="btn btn-primary">
                    Cadastrar
                  </button>
                </div>
              </div>
            </div>
          </form>

          <table className="table" id="tableRawMaterial">
            <thead>
              <tr>
                <th scope="col">Matéria prima</th>
                <th scope="col">Quantidade</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
