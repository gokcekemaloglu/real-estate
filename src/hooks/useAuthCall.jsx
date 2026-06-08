import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useAxios, {axiosPublic} from './useAxios'
import { fetchFail, fetchStart, loginSuccess, logoutSuccess, registerSuccess,  } from '../features/authSlice'

const useAuthCall = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const axiosWithToken = useAxios()

    const register = async (userInfo) => {
        dispatch(fetchStart())
        try {
            const {data} = await axiosPublic.post("auth/signup", userInfo)
            dispatch(registerSuccess(data))
            navigate("/login")
        } catch (error) {
            console.log("Register Error", error)
            dispatch(fetchFail())
        }
    }

    const login = async (userInfo) => {
        dispatch(fetchStart())
        try {
            const {data} = await axiosPublic.post("auth/login", userInfo)
            dispatch(loginSuccess(data))
            navigate("/")
        } catch (error) {
            console.log("Login Error", error)
            dispatch(fetchFail())
        }
    }

    const logout = async () => {
        dispatch(fetchStart())
        try {
            await axiosWithToken.post("auth/logout")
            dispatch(logoutSuccess())
            navigate("/")
        } catch (error) {
            console.log("Logout Error", error)
            dispatch(fetchFail())
        }
    }
  return {register, login, logout}
}

export default useAuthCall