import Header from "../components/Header";
import React, { useEffect } from "react";
import api from "../service/api";

export default function EstimateProduction() {
  useEffect(() => {
    api.get("/products/produce").then((response) => {
      let value = 0.0;
      const groupedProducts = response.data.reduce((acc, product) => {
        if (!acc[product.name]) {
          acc[product.name] = {
            name: product.name,
            price: product.price,
            count: 1,
          };
        } else {
          acc[product.name].count += 1;
        }
        return acc;
      }, {});

      document.querySelector("#tableProduce").innerHTML = `
            <tr>
                <th scope="col">Produto</th>
                <th scope="col">Quantidade</th>
                <th scope="col">Preço</th>
            </tr>
            `;
      Object.values(groupedProducts).map((product) => {
        value += product.price * product.count;
        document.querySelector("#tableProduce").innerHTML += `
            <tr>
                <td>${product.name}</td>
                <td>${product.count}</td>
                <td>R$${product.price}</td>
            </tr>
            `;
      });
      document.querySelector("#tableProduce").innerHTML += `
            <tr>
                <td><b>Total</b></td>
                <td></td>
                <td>R$${value},00</td>
            </tr>
            `;
    });
  }, []);
  return (
    <div>
      <Header />
      <div className="container">
        <table className="table" id="tableProduce">
          <thead>
            <tr>
              <th scope="col">Produto</th>
              <th scope="col">Quantidade</th>
              <th scope="col">Preço</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </div>
  );
}
