import { useDispatch } from 'react-redux'
import useAxios from './useAxios'
import { fetchFail, fetchStart, setData } from '../features/userSlice'
import { logoutSuccess } from '../features/authSlice'
import { useNavigate } from 'react-router-dom'
import { SweetAlertIcons, SweetNotify } from '../helper/SweetNotify'

const useUserCall = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const axiosWithToken = useAxios()

  const handleError = (error, fallbackMsg) => {
    const errorMsg = error?.response?.data?.message || fallbackMsg
    dispatch(fetchFail(errorMsg));
    SweetNotify(errorMsg, SweetAlertIcons.ERROR);
  };  
  
  const getSingleUser = async(id) => {
    dispatch(fetchStart())
    try {
      const {data} = await axiosWithToken.get(`users/${id}`)
      dispatch(setData(data.data))
    } catch (error) {
      dispatch(fetchFail())
      handleError(error, `${id} kimlikli kullanıcı detayları yüklenemedi!`);
    }
  }

  // Update User's own profile
  const updateMe = async (id, userUpdateInfo) => {
    dispatch(fetchStart())
    try {
      await axiosWithToken.patch(`users/${id}/updateMe`, userUpdateInfo)
      SweetNotify("Kullanıcı bilgileri başarıyla güncellendi!", SweetAlertIcons.SUCCESS)
    } catch (error) {
      dispatch(fetchFail())
      handleError(error, "Kulllanıcı hesabı güncellenirken bir hata oluştu!");
    } finally {
      getSingleUser(id)
    }
  }

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
      dispatch(fetchFail())
      handleError(error, "Şifre değiştirilirken bir hata oluştu!");
    }
  }
  
  return {
    updateMe,
    getSingleUser,
    changeMyPassword
  }
}

export default useUserCall