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
            const {data} = await axiosPublic.post("/auth/signup", userInfo)
            // console.log(data);
            
            dispatch(registerSuccess(data.data))
            SweetNotify("Hesabınız başarıyla oluşturuldu. Güvenle giriş yapabilirsiniz.", SweetAlertIcons.SUCCESS)
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
            const {data} = await axiosPublic.post("/auth/login", userInfo)
            // console.log(data);
            
            dispatch(loginSuccess(data.data))
            SweetNotify(`Sisteme başarıyla giriş yapıldı. Hoşgeldiniz, ${data?.user?.userName || 'Kullanıcı'}!`, SweetAlertIcons.SUCCESS)
            navigate("/")
        } catch (error) {
            console.log("Login Error", error)
            dispatch(fetchFail())
            const errorMsg = error.response?.data?.message || "Giriş işlemi sırasında bir hata oluştu. Giriş bilgileri hatalı veya eksik. Lütfen tekrar deneyin."
            SweetNotify(errorMsg, SweetAlertIcons.ERROR)
        }
    }

    const logout = async () => {
        const confirmed = await SweetConfirm("Oturumu Kapat", "Sistemden çıkış yapmak istediğinize emin misiniz?", SweetAlertIcons.QUESTION)
        if (!confirmed) return //Exit if user cancels logout
        dispatch(fetchStart())
        try {
            await axiosWithToken.get("/auth/logout")
            dispatch(logoutSuccess())
            SweetNotify("Oturum başarıyla sonlandırıldı.", SweetAlertIcons.SUCCESS)
            navigate("/")
        } catch (error) {
            console.log("Logout Error", error)
            dispatch(fetchFail())
            const errorMsg = error.response?.data?.message || "Çıkış işlemi sırasında bir hata oluştu. Lütfen tekrar deneyin."
            SweetNotify(errorMsg, SweetAlertIcons.ERROR)
        }
    }
  return {register, login, logout}
}

export default useAuthCall