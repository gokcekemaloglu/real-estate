import { useDispatch } from 'react-redux'
import useAxios from './useAxios'
import { fetchFail, fetchStart, setData } from '../features/userSlice'
import { logoutSuccess } from '../features/authSlice'
import { useNavigate } from 'react-router-dom'
import { SweetAlertIcons, SweetConfirm, SweetNotify } from '../helper/SweetNotify'

const useUserCall = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const axiosWithToken = useAxios()

  const handleError = (error, fallbackMsg) => {
    const errorMsg = error?.response?.data?.message || fallbackMsg
    dispatch(fetchFail(errorMsg));
    SweetNotify(errorMsg, SweetAlertIcons.ERROR);
  };  

  const getSingleUserData = async(id) => {
    dispatch(fetchStart())
    try {
      const {data} = await axiosWithToken.get(`users/${id}`)
      dispatch(setData({endpoint: "user", data: data?.data}))
    } catch (error) {
      handleError(error, `Kullanıcı profil detayları yüklenirken bir hata oluştu!`);
    }
  }

  // Update User's own profile
  const updateMe = async (id, userUpdateInfo) => {
    dispatch(fetchStart())
    try {
      await axiosWithToken.patch(`users/${id}/updateMe`, userUpdateInfo)
      SweetNotify("Profil bilgileriniz başarıyla güncellendi!", SweetAlertIcons.SUCCESS)
    } catch (error) {
      handleError(error, "Profil bilgileriniz güncellenirken beklenmedik bir hata oluştu!");
    } finally {
      getSingleUser(id)
    }
  }

  const updateUser = async (id, updatedUser) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.patch(`users/${id}`, updatedUser);
      SweetNotify("Kullanıcı hesap kartı başarıyla güncellendi!", SweetAlertIcons.SUCCESS)
    } catch (error) {
      handleError(error, "Kullanıcı hesap bilgileri güncellenirken bir hata oluştu!");
    } 
  };

  // Change User's own password
  const changeMyPassword = async (id, values) => {
    dispatch(fetchStart())
    try {
      await axiosWithToken.patch(`users/${id}/changeMyPassword`, values)
      SweetNotify("Şifreniz başarıyla değiştirildi. Güvenliğiniz için yeniden giriş yapınız.!", SweetAlertIcons.SUCCESS)
      await axiosWithToken.get("auth/logout")
      dispatch(logoutSuccess())
      navigate("/login")
    } catch (error) {
      handleError(error, "Güvenlik şifreniz yenilenirken bir hata oluştu!");
    }
  }

  // User soft delete
  const toggleUserStatus = async (id) => {
    const confirmed = await SweetConfirm("Hesap Durumu", "Kullanıcının sisteme erişim yetkisini değiştirmek istediğinize emin misiniz?", SweetAlertIcons.QUESTION)
    if (!confirmed) return //Exit if user cancels delete
    dispatch(fetchStart());
    try {
      await axiosWithToken.patch(`users/${id}/status`);
      SweetNotify("Kullanıcı aktiflik durumu başarıyla güncellendi!", SweetAlertIcons.SUCCESS)
    } catch (error) {
      handleError(error, "Kullanıcı aktiflik durumu değiştirilirken bir hata oluştu!");
    }
  };

  const deleteUser = async (id) => {
    const isConfirmed = await SweetConfirm("Hesabı Kaldır", "Bu kullanıcı hesabını sistemden kalıcı olarak silmek istediğinize emin misiniz?", SweetAlertIcons.QUESTION);
    if (!isConfirmed) return; //if cancelled function stops
    dispatch(fetchStart());
    try {
      await axiosWithToken.delete(`users/${id}`);
      SweetNotify("Kullanıcı hesabı sistemden tamamen kaldırıldı.", SweetAlertIcons.SUCCESS);
    } catch (error) {
      handleError(error, "Kullanıcı hesabı silinirken bir hata oluştu!");
    }
  };
  
  return {
    getSingleUserData,
    updateMe,
    updateUser,
    changeMyPassword,
    toggleUserStatus,
    deleteUser
  }
}

export default useUserCall