import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";

export const Header = () => {
  const navigate = useNavigate();

  const test = () => {
    navigate("/popular");
  };

  return (
    <>
      <div className="flex justify-center w-full cursor-pointer">
        <div className="w-1/3" onClick={test}>
          <img src={logo} alt="The movie db" />
        </div>
      </div>
    </>
  );
};
