import { useDispatch } from "react-redux";
import useAxios, { axiosPublic } from "./useAxios";
import { fetchFail, fetchStart, setData } from "../features/propertySlice";
import { SweetAlertIcons, SweetNotify } from "../helper/SweetNotify";

const usePropertyCall = () => {
  const dispatch = useDispatch();
  const axiosWithToken = useAxios();

  const handleError = (error, fallbackMsg) => {
    const errorMsg = error?.response?.data?.message || fallbackMsg
    dispatch(fetchFail(errorMsg));
    SweetNotify(errorMsg, SweetAlertIcons.ERROR);
  };

  const getSinglePropertyData = async (id) => {
    dispatch(fetchStart());
    try {
      const {data} = await axiosPublic(`properties/${id}`)
      dispatch(setData({endpoint:"property", data: data?.data}))
    } catch (error) {
      handleError(error, `${id} kimlikli gayrimenkul detayları yüklenemedi!`);
    }
  };

  const postPropertyData = async (endpoint = "properties", info) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.post(`${endpoint}`, info);
      SweetNotify("İlan başarıyla yayına alındı.", SweetAlertIcons.SUCCESS)
    } catch (error) {
      handleError(error, "Yeni ilan oluşturulurken hata oluştu!");
    }
  };

  const putPropertyData = async (id, info) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.put(`properties/${id}`, info);
      SweetNotify("İlan başarıyla güncellendi!", SweetAlertIcons.SUCCESS)
    } catch (error) {
      handleError(error, "İlan güncellenirken bir hata oluştu!");
    } finally {
        getSinglePropertyData(id)
    }
  };

  const deleteProperty = async (id) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.delete(`properties/${id}`)
      SweetNotify("İlan başarıyla silindi!", SweetAlertIcons.SUCCESS)
    } catch (error) {
      handleError(error, "İlan silinirken bir hata oluştu!");
    }
  };
  
  const togglePropertyStatus = async (id) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.put(`properties/${id}/status`);
      SweetNotify("İlan durumu değişti!", SweetAlertIcons.SUCCESS)
    } catch (error) {
      handleError(error, "İlan aktiflik durumu değiştirilirken bir hata oluştu!");
    } finally {
        getSinglePropertyData(id)
    }
  };
  
  const toggleFeaturedStatus = async (id) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.put(`properties/${id}/featured`);
      SweetNotify("İlan durumu değişti!", SweetAlertIcons.SUCCESS)
    } catch (error) {
      handleError(error, "İlan durumu değiştirilirken bir hata oluştu!");
    } finally {
        getSinglePropertyData(id)
    }
  };

  return { getSinglePropertyData, postPropertyData, putPropertyData, deleteProperty, togglePropertyStatus, toggleFeaturedStatus };
};

export default usePropertyCall;
