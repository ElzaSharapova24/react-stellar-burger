import {Navigate, useLocation} from "react-router";
import {useSelector} from "react-redux";
import {getAuthData, getIsAuthChecked} from "../../services/selectors";
import Loader from "../loader";

function ProtectedRoute({children, onlyUnAuth}) {
  const location = useLocation();
  const authData = useSelector(getAuthData);
  const isAuthCheck = useSelector(getIsAuthChecked);
  
  
  if (!isAuthCheck) {
    console.log('wait user checkout')
    return <Loader/>
  }
  
  if (onlyUnAuth && authData) {
    const from  = location.state?.from || {pathname: '/'}
    console.log('navigate from login-page to index')
    return <Navigate replace to={from}/>
  }
  
  if (!onlyUnAuth && !authData) {
    console.log('navigate from page to login-page')
    return <Navigate replace to="/login" state={{from: location}}/>
  }
  
  console.log('render component')
  return children;
}

export default ProtectedRoute;
