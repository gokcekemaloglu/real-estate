import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { SweetAlertIcons, SweetNotify } from '../helper/SweetNotify';

const PrivateRouter = () => {
  const {token} = useSelector((state) => state.auth);
  if (!token) {
    SweetNotify("Bu sayfaya erişebilmek için lütfen önce giriş yapınız.", SweetAlertIcons.WARNING);
    return <Navigate to="/login" replace />
  }
  return <Outlet />
}

export default PrivateRouter
