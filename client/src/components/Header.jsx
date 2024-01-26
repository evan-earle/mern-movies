import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpg";

export const Header = () => {
  const navigate = useNavigate();

  const navToPopular = () => {
    navigate("/popular");
  };

  return (
    <>
      <div className="flex justify-center w-1/3 cursor-pointer mt-14">
        <div onClick={navToPopular}>
          <img src={logo} alt="The movie db" />
        </div>
      </div>
    </>
  );
};
