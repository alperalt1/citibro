import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../redux/Hooks';
import Root from '../../shared/components/Root';
import { MenuModel } from '../models/MenuModel';

interface Props{
  menu?: MenuModel[]
  routeTitleMap?: Record<string, string>
}

const PrivateRoute: React.FC<Props> = ({ menu, routeTitleMap }) => {
  const { authenticated } = useAppSelector(state => state.auth);

  if (!authenticated) {
    return <Navigate to="/" />;
  }

  return <Root sidebarItemList={menu} routeTitleMap={routeTitleMap} />;
};

export default PrivateRoute;
