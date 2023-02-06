import Header from "../components/Header";
import { useEffect, useState } from "react";
import api from "../service/api";

export default function RegisterProduct() {
  const [formContent, setFormContent] = useState({});
  const [rawMaterials, setRawMaterials] = useState([]);

  useEffect(() => {
    api
      .get("/raw-materials")
      .then((response) => setRawMaterials(response.data));
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <div className="mb-3">
      <Header />
      <div className="container">
        <h3>Register Product</h3>
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-3">
            <label htmlFor="inputProductName" className="formLabel">
              Name
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
              placeholder="Name of the product"
              required
            />
          </div>
          <div className="col-md-2">
            <label htmlFor="inputProductPrice" className="formLabel">
              Price
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
              placeholder="Price of the product"
              required
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="selectRawMaterial" className="formLabel">
              Raw Material
            </label>
            <div
              className="input-group mb-3
           "
            >
              <select
                className="form-select "
                aria-label="Default select example"
              >
                <option selected>Open this select menu</option>
                <option value="1">Raw Material 1</option>
                <option value="2">Raw Material 2</option>
                <option value="3">Raw Material 3</option>
                <input
                  type="number"
                  className="form-control col-md-1"
                  placeholder="Quantity"
                />
              </select>
              <input className="form-control" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
