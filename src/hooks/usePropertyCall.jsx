import { useDispatch } from "react-redux";
import useAxios, { axiosPublic } from "./useAxios";
import { fetchFail, fetchStart, setData } from "../features/propertySlice";
import { SweetAlertIcons, SweetConfirm, SweetNotify } from "../helper/SweetNotify";

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
      handleError(error, "Gayrimenkul detayları yüklenirken beklenmedik bir hata oluştu!");
    }
  };

  const postPropertyData = async (endpoint = "properties", info) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.post(`${endpoint}`, info);
      SweetNotify("Gayrimenkul ilanı başarıyla portföye eklendi.", SweetAlertIcons.SUCCESS)
    } catch (error) {
      handleError(error, "Yeni gayrimenkul portföyü oluşturulurken bir hata oluştu!");
    }
  };

  const putPropertyData = async (id, info) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.put(`properties/${id}`, info);
      SweetNotify("Portföy kartı başarıyla güncellendi.", SweetAlertIcons.SUCCESS)
    } catch (error) {
      handleError(error, "Gayrimenkul bilgileri güncellenirken bir hata oluştu!");
    } finally {
        getSinglePropertyData(id)
    }
  };

  const deleteProperty = async (id) => {
    const confirmed = await SweetConfirm("Portföyü Kaldır", "Bu gayrimenkul ilanını sistemden kalıcı olarak silmek istediğinize emin misiniz?", SweetAlertIcons.QUESTION)
    if (!confirmed) return //Exit if user cancels delete
    dispatch(fetchStart());
    try {
      await axiosWithToken.delete(`properties/${id}`)
      SweetNotify("Gayrimenkul portföy kaydı sistemden tamamen kaldırıldı.", SweetAlertIcons.SUCCESS)
    } catch (error) {
      handleError(error, "İlan kaydı silinirken beklenmedik bir hata oluştu!");
    }
  };
  
  const togglePropertyStatus = async (id) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.patch(`properties/${id}/status`);
      SweetNotify("İlan yayın durumu başarıyla güncellendi.", SweetAlertIcons.SUCCESS)
    } catch (error) {
      handleError(error, "İlan aktiflik durumu değiştirilirken bir hata oluştu!");
    }
  };
  
  const toggleFeaturedStatus = async (id) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.patch(`properties/${id}/featured`);
      SweetNotify("İlan vitrin sergileme durumu başarıyla güncellendi.", SweetAlertIcons.SUCCESS)
    } catch (error) {
      handleError(error, "Vitrin ilan durumu değiştirilirken bir hata oluştu!");
    }
  };

  return { getSinglePropertyData, postPropertyData, putPropertyData, deleteProperty, togglePropertyStatus, toggleFeaturedStatus };
};

export default usePropertyCall;
