import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

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
      <button type="submit" className="mr-10">
        Watchlist
      </button>
      <button type="submit" className="" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};
