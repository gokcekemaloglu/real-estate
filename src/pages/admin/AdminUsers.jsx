import React from "react";
import useFetchData from "../../hooks/useFetchData";
import useUserCall from "../../hooks/useUserCall";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchFail, fetchStart, setData } from "../../features/userSlice";
import AdminUserRow from "../../components/admin/users/AdminUserRow";
import { useNavigate } from "react-router-dom";

const AdminUsers = () => {
  const { fetchData } = useFetchData();
  const { toggleUserStatus, deleteUser } = useUserCall();
  const { users, loading } = useSelector((state) => state.users);
  const navigate = useNavigate()

  const loadAdminUserData = () => {
    fetchData({
      endpoint: "users",
      stateKey: "users",
      sliceActions: { fetchStart, fetchFail, setData },
      page: 1,
      limit: 20,
      isWithToken: true,
    });
  };

  useEffect(() => {
    loadAdminUserData();
  }, []);

  const handleStatusToggle = async (id) => {
    await toggleUserStatus(id);
    loadAdminUserData();
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
    loadAdminUserData();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-75">
        <div className="w-10 h-10 border-2 border-slate-200 border-t-brand-gold rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      {/* Top Action Toolbar Header Section */}
      <div>
        <h1 className="text-xl font-serif text-slate-800 dark:text-white font-light tracking-wide">
          Sistem Üye & Kullanıcı Yönetimi
        </h1>
        <p className="text-[11px] text-slate-400 uppercase tracking-widest mt-0.5">
          Kayıtlı sistem kullanıcıları, danışmanlar listesi ve hızlı erişim
          yetki paneli
        </p>
      </div>

      {/* Hybrid Row Cards Wrapper Framework Section */}
      <div className="flex flex-col gap-4 mt-4">
        {users?.length > 0 ? (
          users.map((user) => (
            <AdminUserRow
              key={user._id}
              user={user}
              handleStatusToggle={() => handleStatusToggle(user._id)}
              handleDelete={() => handleDelete(user._id)}
              onDetailClick={() => navigate(`/admin/users/detail/${user?._id}`)}
            />
          ))
        ) : (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-12 text-center text-slate-400 uppercase tracking-widest text-xs font-light shadow-sm">
            Sistemde kayıtlı herhangi bir üye veya kullanıcı bulunamadı.
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
