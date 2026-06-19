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
  
  // const getAllUsers = async () => {
  //   dispatch(fetchStart());
  //   try {
  //     const { data } = await axiosWithToken.get("users");
  //     dispatch(setData(data.data));
  //   } catch (error) {
  //     handleError(error, `Kullanıcılar yüklenirken bir hata oluştu!`);
  //   }
  // };

  const getSingleUser = async(id) => {
    dispatch(fetchStart())
    try {
      const {data} = await axiosWithToken.get(`users/${id}`)
      dispatch(setData(data.data))
    } catch (error) {
      handleError(error, `${id} kimlikli kullanıcı detayları yüklenemedi!`);
    }
  }

  // Update User's own profile
  const updateMe = async (id, userUpdateInfo) => {
    dispatch(fetchStart())
    try {
      await axiosWithToken.patch(`users/${id}/updateMe`, userUpdateInfo)
      SweetNotify("Kullanıcı bilgileriniz başarıyla güncellendi!", SweetAlertIcons.SUCCESS)
    } catch (error) {
      handleError(error, "Kulllanıcı hesabınız güncellenirken bir hata oluştu!");
    } finally {
      getSingleUser(id)
    }
  }

  const updateUser = async (id, updatedUser) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.patch(`users/${id}`, updatedUser);
      SweetNotify("Kullanıcı bilgileri başarıyla güncellendi!", SweetAlertIcons.SUCCESS)
    } catch (error) {
      handleError(error, "Kulllanıcı hesabı güncellenirken bir hata oluştu!");
    } 
  };

  // Change User's own password
  const changeMyPassword = async (id, values) => {
    dispatch(fetchStart())
    try {
      await axiosWithToken.patch(`users/${id}/changeMyPassword`, values)
      SweetNotify("Password changed successfully!!", SweetAlertIcons.SUCCESS)
      await axiosWithToken.get("auth/logout")
      dispatch(logoutSuccess())
      navigate("/login")
    } catch (error) {
      handleError(error, "Şifre değiştirilirken bir hata oluştu!");
    }
  }

  // User soft delete
  const toggleUserStatus = async (id) => {
    const confirmed = await SweetConfir("Sil", "Silmek istediğinize emin misiniz?", SweetAlertIcons.QUESTION)
    if (!confirmed) return //Exit if user cancels delete
    dispatch(fetchStart());
    try {
      await axiosWithToken.patch(`users/${id}/status`);
      SweetNotify("Aktiflik durumu başarıyla güncellendi!", SweetAlertIcons.SUCCESS)
    } catch (error) {
      handleError(error, "Müşteri aktiflik durumu değiştirilirken bir hata oluştu!");
    }
  };

  const deleteUser = async (id) => {
    const isConfirmed = await SweetConfirm("Sil", "Silmek istediğinize emin misiniz?", SweetAlertIcons.QUESTION);
    if (!isConfirmed) return; //if cancelled function stops
    dispatch(fetchStart());
    try {
      await axiosWithToken.delete(`users/${id}`);
      SweetNotify("Kullanıcı başarıyla silindi", SweetAlertIcons.SUCCESS);
    } catch (error) {
      handleError(error, "Kullanıcı silinirken bir hata oluştu!");
    }
  };
  
  return {
    // getAllUsers,
    getSingleUser,
    updateMe,
    updateUser,
    changeMyPassword,
    deleteUser
  }
}

export default useUserCall