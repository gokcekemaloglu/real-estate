import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useAxios, {axiosPublic} from './useAxios'
import { fetchFail, fetchStart, loginSuccess, logoutSuccess, registerSuccess,  } from '../features/authSlice'
import { SweetNotify, SweetAlertIcons, SweetConfirm } from '../helper/SweetNotify'
import useFavoritesCall from './useFavoritesCall'

const useAuthCall = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const axiosWithToken = useAxios()
    const {getMyFavorites} = useFavoritesCall()

    const handleError = (error, fallbackMsg) => {
        const errorMsg = error?.response?.data?.message || fallbackMsg
        dispatch(fetchFail(errorMsg))
        SweetNotify(errorMsg, SweetAlertIcons.ERROR)
    }

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
            handleError(error, "Kayıt işlemi sırasında bir hata oluştu. Lütfen bilgilerinizi kontrol edip tekrar deneyin.")
        }
    }

    const login = async (userInfo) => {
        dispatch(fetchStart())
        try {
            const {data} = await axiosPublic.post("/auth/login", userInfo)
            console.log(data);
            
            dispatch(loginSuccess(data.data))
            await getMyFavorites() // Fetch user's favorites immediately after login to sync state
            SweetNotify(`Sisteme başarıyla giriş yapıldı. Hoşgeldiniz, ${data?.data?.user?.userName || 'Kullanıcı'}!`, SweetAlertIcons.SUCCESS)
            navigate("/")
        } catch (error) {
            console.log("Login Error", error)
            handleError(error, "Giriş işlemi sırasında bir hata oluştu. Lütfen bilgilerinizi kontrol edip tekrar deneyin.")
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
            handleError(error, "Oturum kapatma işlemi sırasında bir hata oluştu. Lütfen tekrar deneyin.")
        }
    }
  return {register, login, logout}
}

export default useAuthCall