import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { PopularMovies } from "./pages/PopularMovies";
import { Watchlist } from "./pages/Watchlist";
import { Toaster } from "react-hot-toast";
import PrivateRoutes from "./components/PrivateRoutes";

function App() {
  return (
    <div className="App">
      <Toaster
        position="bottom-center"
        toastOptions={{
          style: {
            fontSize: "1rem",
            border: "1px solid grey",
            boxShadow: "2px 2px 2px 2px",
          },
        }}
      ></Toaster>
      <Router>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/popular" element={<PopularMovies />} />
            <Route path="/watchlist" element={<Watchlist />} />
          </Route>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
