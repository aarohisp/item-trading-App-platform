import { Redirect } from "react-router-dom";
import { FC } from "react";

const withAuthorization = (allowedRoles: Array<number>) => (WrappedComponent: FC) => {
  const WithAuthorization = (props: any) => {
    const userinformation = JSON.parse(localStorage.getItem("userData") || "{}");
    if (!allowedRoles.includes(Number(userinformation?.userRoleId))) {
      return <Redirect to="/unauthorized" />;
    }
    return <WrappedComponent {...props} />;
  };

  return WithAuthorization;
};

export default withAuthorization;
