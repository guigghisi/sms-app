import { Link } from "react-router-dom";
import Header from "../components/Header.js";

export default function NotFound() {
  return (
    <div className="mb-3">
      <Header />
      <div className="container text-center">
        <h1>404 - Page not found</h1>
        <img src="https://http.cat/404" alt="404 - Page not found" />
        <p>
          <Link to="/">Return to home page</Link>
        </p>
      </div>
    </div>
  );
}
