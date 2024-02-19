import { Outlet, useLocation, Navigate } from "react-router-dom"

const ProtectedRoute = () => {
    const location = useLocation();
    let authLogin = localStorage.getItem("user");
    // console.log(authLogin)

    return authLogin
        ? <Outlet />
        : <Navigate to="/login" replace state={{ from: location }} />
}

export default ProtectedRoute;