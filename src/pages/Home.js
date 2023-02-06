import "./style.css";
import Header from "../components/Header";

export default function Home() {
  return (
    <div className="mb-3">
      <Header />
      <div className="flex-row">
        <div className="container">
          <h1>Home</h1>
        </div>
      </div>
    </div>
  );
}
