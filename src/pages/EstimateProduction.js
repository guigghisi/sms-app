import Header from "../components/Header";
import { useEffect } from "react";
import api from "../service/api";

export default function EstimateProduction() {
  useEffect(() => {
    api.get("/products/produce").then((response) => {
      console.log(response.data);
    });
  }, []);
  return (
    <div>
      <Header />
      <div className="container"></div>
    </div>
  );
}
