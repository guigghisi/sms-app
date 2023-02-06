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
        <div>
          <button
            className="btn btn-primary"
            onClick={() => {
              navigate("/RegisterProduct");
            }}
          >
            Register Product
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              navigate("/RegisterRawMaterial");
            }}
          >
            Register Raw Material
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              navigate("/");
            }}
          >
            Estimate production
          </button>
        </div>
      </div>
    </nav>
  );
}