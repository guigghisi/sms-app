import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import RegisterProduct from "../pages/RegisterProduct";
import NotFound from "../pages/NotFound";
import RegisterRawMaterial from "../pages/RegisterRawMaterial";
import EstimateProduction from "../pages/EstimateProduction";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" replace element={<Home />} />
        <Route path="/RegisterProduct" element={<RegisterProduct />} />
        <Route path="/RegisterRawMaterial" element={<RegisterRawMaterial />} />
        <Route path="/EstimateProduction" element={<EstimateProduction />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
