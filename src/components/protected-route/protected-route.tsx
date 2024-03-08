import { Navigate, useLocation } from "react-router";
import { getAuthData, getIsAuthChecked } from "../../services/selectors";
import Loader from "../loader";
import React from "react";
import { useSelector } from "../../services/hooks";

interface ProtectedRouteProps extends React.PropsWithChildren {
    children: React.ReactNode;
    onlyUnAuth?: boolean;
}

const ProtectedRoute = ({ children, onlyUnAuth }: ProtectedRouteProps) => {
    const location = useLocation();
    const authData = useSelector(getAuthData);
    const isAuthCheck = useSelector(getIsAuthChecked);

    if (!isAuthCheck) {
        return <Loader />;
    }

    if (onlyUnAuth && authData) {
        const from = location.state?.from || { pathname: "/" };
        return <Navigate replace to={from} />;
    }

    if (!onlyUnAuth && !authData) {
        return <Navigate replace to="/login" state={{ from: location }} />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
