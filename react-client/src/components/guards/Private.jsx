import React from 'react';
import { Navigate } from 'react-router-dom';

import useAuth from '../../hooks/useAuth';
import { ROUTE_ENDPOINTS } from '../../constants/routeEndpoints';

const Private = ({ Component }) =>
{
    const { auth } = useAuth();

    return auth.user
        ? <Component />
        : <Navigate to={`/${ROUTE_ENDPOINTS.LOGIN}`} />;
}

export default Private;