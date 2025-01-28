import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import useAdmins from '../Hooks/useAdmins';

const AdminRoutes = ({ children }) => {
    const { user, loading } = useAuth();
    const [isAdmin, isAdminLoading] = useAdmins();


    const location = useLocation();

    if (loading || isAdminLoading) {
        return <div className='flex items-center justify-center h-screen'>
            <span className="loading loading-spinner loading-xl "></span>
        </div>
    }
    if (user && isAdmin) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace></Navigate>
};

export default AdminRoutes;