import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const PrivateRoutes = () => {

    const auth = useAuth();
    return(
        (auth.user || localStorage.getItem('user')) ? <Outlet/> : <Navigate to="/login"/>
    )
}

export default PrivateRoutes