import {Navigate, useLocation} from "react-router";
import {useSelector} from "react-redux";
import {getIsAuthChecked, getUser} from "../../services/selectors";
import Loader from "../loader";

function ProtectedRoute({children, onlyUnAuth}) {
  const location = useLocation();
  const user = useSelector(getUser);
  const isAuthCheck = useSelector(getIsAuthChecked);
  
  
  if (!isAuthCheck) {
    console.log('wait user checkout')
    return <Loader/>
  }
  
  if (onlyUnAuth && user) {
    console.log('navigate from login to index')
    return <Navigate to="/"/>
  }
  
  if (!onlyUnAuth && !user) {
    console.log('navigate from page to login')
    return <Navigate to="/login"/>
  }
  
  console.log('render component')
  return children;
}

export default ProtectedRoute;
