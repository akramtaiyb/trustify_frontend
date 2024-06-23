import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element: Element, ...rest }) => {
  const { isAuth } = useAuth();

  return isAuth ? <Element {...rest} /> : <Navigate to="/login" />;
};

export default PrivateRoute;
