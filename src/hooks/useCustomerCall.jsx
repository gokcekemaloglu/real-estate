import React from 'react'
import { useDispatch } from 'react-redux';
import useAxios from './useAxios';
import { fetchFail, fetchStart, setData } from '../features/customerSlice';
import { SweetAlertIcons, SweetConfirm, SweetNotify } from '../helper/SweetNotify';

const useCustomerCall = () => {
  const dispatch = useDispatch();
  const axiosWithToken = useAxios();

  const handleError = (error, fallbackMsg) => {
    const errorMsg = error?.response?.data?.message || fallbackMsg
    dispatch(fetchFail(errorMsg));
    SweetNotify(errorMsg, SweetAlertIcons.ERROR);
  };

  const getSingleCustomerData = async (id) => {
    dispatch(fetchStart());
    try {
      const {data} = await axiosWithToken.get(`customers/${id}`)
      dispatch(setData({endpoint:"customer", data: data?.data}))
    } catch (error) {
      handleError(error, `${id} kimlikli müşteri detayları yüklenemedi!`);
    }
  };
  
  const postCustomerData = async (endpoint = "Customers", info) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.post(`${endpoint}`, info);
      SweetNotify("Müşteri başarıyla yayına alındı.", SweetAlertIcons.SUCCESS)
    } catch (error) {
      handleError(error, "Yeni müşteri oluşturulurken hata oluştu!");
    }
  };
  
  const putCustomerData = async (id, info) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.put(`customers/${id}`, info);
      SweetNotify("Müşteri başarıyla güncellendi!", SweetAlertIcons.SUCCESS)
    } catch (error) {
      handleError(error, "Müşteri güncellenirken bir hata oluştu!");
    } finally {
      getSingleCustomerData(id)
    }
  };
  
  const deleteCustomer = async (id) => {
    const confirmed = await SweetConfirm("Sil", "Silmek istediğinize emin misiniz?", SweetAlertIcons.QUESTION)
    if (!confirmed) return //Exit if user cancels delete
    dispatch(fetchStart());
    try {
      await axiosWithToken.delete(`customers/${id}`)
      SweetNotify("Müşteri başarıyla silindi!", SweetAlertIcons.SUCCESS)
    } catch (error) {
      handleError(error, "Müşteri silinirken bir hata oluştu!");
    }
  };
    
  const toggleCustomerStatus = async (id) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.patch(`customers/${id}/status`);
      SweetNotify("Yayın durumu başarıyla güncellendi!", SweetAlertIcons.SUCCESS)
    } catch (error) {
      handleError(error, "Müşteri aktiflik durumu değiştirilirken bir hata oluştu!");
    }
  };

  return {getSingleCustomerData, postCustomerData, putCustomerData, deleteCustomer, toggleCustomerStatus}
}

export default useCustomerCall