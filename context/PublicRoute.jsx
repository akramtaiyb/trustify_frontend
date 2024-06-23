import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ element: Element, ...rest }) => {
  const { isAuth } = useAuth();

  return !isAuth ? <Element {...rest} /> : <Navigate to="/" />;
};

export default PublicRoute;
