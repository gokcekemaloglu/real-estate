import axios from "axios"
import { useMemo } from "react"
import { useSelector } from 'react-redux'

const BASE_URL = import.meta.env.VITE_BASE_URL || "http://localhost:8000"

export const axiosPublic = axios.create({baseURL: BASE_URL, timeout:10000})

export const axiosWithToken =  axios.create({baseURL: BASE_URL, timeout:10000})

const useAxios = () => {
    const token = useSelector(state => state.auth?.token)
    // useMemo ensures interceptors are only attached when the token changes, preventing multiple interceptor stacks
    useMemo(() => {
    const requestInterceptor = axiosWithToken.interceptors.request.use((config) => {
        if (token && !config.headers["Authorization"]) {
          config.headers["Authorization"] = `Token ${token}`
        }
        return config
      },
      (error) => Promise.reject(error)
    )

    // Cleanup function to eject the interceptor when component unmounts or token updates
    return () => {
      axiosWithToken.interceptors.request.eject(requestInterceptor)
    }
  }, [token])
    
  return axiosWithToken
}

export default useAxios