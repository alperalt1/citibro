import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../redux/Hooks';

const PublicRoute: React.FC = () => {
  const authenticated = useAppSelector((state) => state.auth.authenticated);
  return authenticated ? <Navigate to="/cuenta/perfil" /> : <Outlet />;
};

export default PublicRoute;