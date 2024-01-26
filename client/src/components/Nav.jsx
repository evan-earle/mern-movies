import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { MovieState } from "../context/MovieProvider";
import { useRef, useState } from "react";
import { Loader } from "./Loader";

export const Nav = () => {
  const navigate = useNavigate();
  const { user, setUser } = MovieState();
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);

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

  const changePhoto = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      storePhoto(reader.result);
    };
  };

  const storePhoto = async (image) => {
    setLoading(true);
    try {
      const data = await axios("/api/users/upload", {
        method: "POST",
        data: JSON.stringify({ data: image }),
        headers: { "Content-type": "application/json" },
      });
      const photo = data.data.url;
      await axios.post(`/api/users/storePhoto`, {
        photo,
      });
      setUser((prevState) => ({ ...prevState, image: photo }));
      toast.success("Photo uploaded");
    } catch (err) {
      console.log(err);
      toast.error("Photo too large");
    }
    setLoading(false);
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="text-white flex justify-end w-9/12 p-3 h-5">
      <div className="flex items-center mt-5">
        <div className="mr-10 ">{user.name}</div>
        <div className="mr-10">
          {loading ? (
            <Loader width={20} />
          ) : (
            <img
              src={user.image}
              alt="profile-photo"
              className="rounded-full w-14 h-14 cursor-pointer"
              onClick={handleImageClick}
            />
          )}
          <input
            type="file"
            className="hidden"
            ref={fileInputRef}
            onChange={changePhoto}
          />
        </div>

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
    </div>
  );
};
