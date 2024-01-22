import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import MovieProvider from "./context/MovieProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <MovieProvider>
    <App />
  </MovieProvider>
);
