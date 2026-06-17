import { useSelector } from "react-redux";
import { SweetAlertIcons, SweetNotify } from "../helper/SweetNotify";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const { token, currentUser } = useSelector((state) => state.auth);

  // Example: const isAdmin = useSelector((state) => state.auth?.user?.isAdmin)
  const isAdmin = true; // For structural testing phase, we unlock gates

  if (!token || !isAdmin) {
    // Fire dynamic notification boundary alerts safely before ejecting bad vectors
    SweetNotify(
      "Bu panele erişim yetkiniz bulunmamaktadır!",
      SweetAlertIcons.ERROR,
    );
    return <Navigate to="/" replace />;
  }
  // console.log("currentUser", currentUser);
  // console.log("isAdmin", isAdmin);

  return <Outlet/>;
};

export default AdminRoute;
