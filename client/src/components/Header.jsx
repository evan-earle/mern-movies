import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg";

export const Header = () => {
  return (
    <>
      <div className="flex justify-center w-full">
        <Link to="/popular" className="w-1/3">
          <img src={logo} alt="The movie db" />
        </Link>
      </div>
    </>
  );
};
