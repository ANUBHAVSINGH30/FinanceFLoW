import { Navigate, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import SignIn from "../features/auth/pages/SignIn";
import SignUp from "../features/auth/pages/Signup";
import Dashboard from "../features/dashboard/pages/Dashboard";

function AppRoutes(){
    return (
        <Routes>

            {/* Public Route */}
            <Route path="/" element={<Navigate to="/signin" replace />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />

            {/* Protected Route */}
            <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
            </Route>

            {/* Fallback Route */}
            <Route path="*" element={<Navigate to="/signin" replace />} />            
        </Routes>
        
    )
};

export default AppRoutes;