import { Oval } from "react-loader-spinner";

export const Loader = () => {
  return (
    <Oval
      visible={true}
      height="50"
      width="50"
      color="white"
      secondaryColor="grey"
      ariaLabel="oval-loading"
      wrapperStyle={{ justifyContent: "center", margin: "1rem" }}
    />
  );
};
