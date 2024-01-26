/* eslint-disable react/prop-types */
import { Oval } from "react-loader-spinner";

export const Loader = ({ width }) => {
  return (
    <Oval
      visible={true}
      height="50"
      width={width}
      color="white"
      secondaryColor="grey"
      ariaLabel="oval-loading"
      wrapperStyle={{
        justifyContent: "center",
        margin: "1rem",
      }}
    />
  );
};
