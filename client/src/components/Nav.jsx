import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

export const Nav = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get("/api/auth/logout");
      localStorage.removeItem("userInfo");
      toast.success("Logged out");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="text-white flex justify-end w-9/12 p-3">
      <Link to="/watchlist">
        <button
          type="submit"
          className="mr-10 hover:text-slate-500 duration-100"
        >
          Watchlist
        </button>
      </Link>
      <button
        type="submit"
        className="hover:text-slate-500 duration-100"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};
