import { useSelector } from "react-redux";
import { SweetAlertIcons, SweetNotify } from "../helper/SweetNotify";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const { token, isAdmin } = useSelector((state) => state.auth);

  if (!token || !isAdmin) {
    SweetNotify(
      "Bu panele erişim yetkiniz bulunmamaktadır!",
      SweetAlertIcons.ERROR,
    );
    return <Navigate to="/" replace />;
  }

  return <Outlet/>;
};

export default AdminRoute;
