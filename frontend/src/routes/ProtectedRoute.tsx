import { Navigate, Outlet } from "react-router-dom";


const ProtectedRoute = () => {
    const token = localStorage.getItem("token");

    // not logged in → redirect to login page
    if(!token){
        return <Navigate to="/signin" replace />
    }

    // logged in → render whatever child route matched
    return <Outlet />;
}

export default ProtectedRoute;