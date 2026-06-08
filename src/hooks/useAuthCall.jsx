import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useAxios, {axiosPublic} from './useAxios'
import { fetchFail, fetchStart, loginSuccess, logoutSuccess, registerSuccess,  } from '../features/authSlice'
import { SweetNotify, SweetAlertIcons, SweetConfirm } from '../helper/SweetNotify'

const useAuthCall = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const axiosWithToken = useAxios()

    const register = async (userInfo) => {
        dispatch(fetchStart())
        try {
            const {data} = await axiosPublic.post("auth/signup", userInfo)
            dispatch(registerSuccess(data))
            SweetNotify("Hesabınız başarıyla oluşturuldu. Giriş yapabilirsiniz.", SweetAlertIcons.SUCCESS)
            navigate("/login")
        } catch (error) {
            console.log("Register Error", error)
            dispatch(fetchFail())
            const errorMsg = error.response?.data?.message || "Kayıt işlemi sırasında bir hata oluştu. Lütfen tekrar deneyin."
            SweetNotify(errorMsg, SweetAlertIcons.ERROR)
        }
    }

    const login = async (userInfo) => {
        dispatch(fetchStart())
        try {
            const {data} = await axiosPublic.post("auth/login", userInfo)
            dispatch(loginSuccess(data))
            SweetNotify(`Hoşgeldiniz, ${data?.user?.userName || 'Kullanıcı'}!`, SweetAlertIcons.SUCCESS)
            navigate("/")
        } catch (error) {
            console.log("Login Error", error)
            dispatch(fetchFail())
            const errorMsg = error.response?.data?.message || "Giriş işlemi sırasında bir hata oluştu. Giriş bilgileri hatalı veya eksik. Lütfen tekrar deneyin."
            SweetNotify(errorMsg, SweetAlertIcons.ERROR)
        }
    }

    const logout = async () => {
         const confirmed = await SweetConfirm("Çıkış Yap", "Çıkış yapmak istediğinize emin misiniz?", SweetAlertIcons.QUESTION)
        if (!confirmed) return //Exit if user cancels logout
        dispatch(fetchStart())
        try {
            await axiosWithToken.post("auth/logout")
            dispatch(logoutSuccess())
            SweetNotify("Başarıyla çıkış yapıldı.", SweetAlertIcons.SUCCESS)
            navigate("/")
        } catch (error) {
            console.log("Logout Error", error)
            dispatch(fetchFail())
            SweetNotify("Çıkış işlemi sırasında bir hata oluştu. Lütfen tekrar deneyin.", SweetAlertIcons.ERROR)
        }
    }
  return {register, login, logout}
}

export default useAuthCall