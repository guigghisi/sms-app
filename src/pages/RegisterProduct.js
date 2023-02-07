import Header from "../components/Header";
import React, { useEffect, useState } from "react";
import api from "../service/api";

export default function RegisterProduct() {
  const [formContent, setFormContent] = useState({});
  const [rawMaterialsApi, setRawMaterialsApi] = useState([]);
  const [rawMaterial, setRawMaterial] = useState([]);

  useEffect(() => {
    api
      .get("/raw-materials")
      .then((response) => setRawMaterialsApi(response.data));
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
        <h3>Cadastrar Produto</h3>
        <form
          className="row row-cols-lg-auto g-3 align-items-end"
          onSubmit={handleSubmit}
        >
          <div className="col-12">
            <label htmlFor="inputProductName" className="formLabel">
              Produto
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
          <div className="col-12">
            <label htmlFor="inputProductPrice" className="formLabel">
              Preço
            </label>
            <input
              value={formContent.productPrice}
              onChange={(event) => {
                setFormContent((prevState) => ({
                  ...prevState,
                  productPrice: Math.max(0, event.target.value),
                }));
              }}
              type="number"
              className="form-control"
              id="inputProductPrice"
              placeholder="R$"
              required
            />
          </div>

          <div className="col-12">
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
                <option selected value={0}>
                  Selecione uma matéria prima
                </option>
                {rawMaterialsApi.map((rawMaterial) => (
                  <option value={rawMaterial.id}>{rawMaterial.name}</option>
                ))}
              </select>
              <input
                type="number"
                className="form-control"
                id="inputRawMaterialQuantity"
                placeholder="Quantidade"
                onChange={(event) => {
                  if (event.target.value < 0) {
                    event.target.value = 0;
                  }
                }}
              />

              <button
                className="btn btn-primary"
                type="button"
                id="button-addon2"
                onClick={() => {
                  if (
                    document.querySelector("#selectRawMaterial").value === 0
                  ) {
                    alert("Selecione uma matéria prima");
                  } else {
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
                  }
                }}
              >
                Adicionar
              </button>
            </div>
          </div>
          <div>
            <button type="submit" className="btn btn-success">
              Cadastrar
            </button>
          </div>
          <div>
            <button
              type="reset"
              className="btn btn-secondary"
              onClick={() => {
                setRawMaterial([]);
              }}
            >
              Limpar
            </button>
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
      <div className="container">
        <h3>Produtos</h3>
        <div className="container">
          <div className="row">
            <div className="col-4">
              <h4>Produto</h4>
            </div>
            <div className="col-4">
              <h4>Preço</h4>
            </div>
            <div className="col-4">
              <h4>Ações</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
