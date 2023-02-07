import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  return (
    <nav className="navbar navbar-dark " style={{ backgroundColor: "#5DADE2" }}>
      <div className="container-fluid ">
        <div className="d-inline-flex">
          <span className="navbar-brand align-text-bottom ">
            <img
              src="https://www.projedata.com.br/wp-content/uploads/img/logo_projedata.svg"
              alt="Logo"
              width="200"
              className="d-inline-block align-text-bottom "
              onClick={() => {
                navigate("/");
              }}
            />
            sms
          </span>
        </div>
        <div className="row">
          <div className="col-4">
            <button
              className="btn btn-primary"
              onClick={() => {
                navigate("/RegisterProduct");
              }}
            >
              Produto
            </button>
          </div>

          <div className="col-4">
            <button
              className="btn btn-primary"
              onClick={() => {
                navigate("/RegisterRawMaterial");
              }}
            >
              Materiais
            </button>
          </div>
          <div className="col-4">
            <button
              className="btn btn-primary"
              onClick={() => {
                navigate("/EstimateProduction");
              }}
            >
              Produção
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
