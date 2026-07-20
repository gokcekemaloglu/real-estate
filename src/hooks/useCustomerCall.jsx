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
      handleError(error, "Müşteri portföy detayları yüklenirken bir hata oluştu!");
    }
  };
  
  const postCustomerData = async (endpoint = "customers", info) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.post(`${endpoint}`, info);
      SweetNotify("Müşteri hesap kaydı başarıyla portföye eklendi.", SweetAlertIcons.SUCCESS)
    } catch (error) {
      handleError(error, "Yeni müşteri portföyü oluşturulurken bir hata oluştu!");
    }
  };
  
  const putCustomerData = async (id, info) => {
    dispatch(fetchStart());
    try {
      await axiosWithToken.patch(`customers/${id}`, info);
      SweetNotify("Müşteri hesap kartı başarıyla güncellendi.", SweetAlertIcons.SUCCESS)
    } catch (error) {
      handleError(error, "Müşteri bilgileri güncellenirken bir hata oluştu!");
    } finally {
      getSingleCustomerData(id)
    }
  };

  // Customer Soft Delete for admin
  const toggleCustomerStatus = async (id) => {
    const confirmed = await SweetConfirm(" Hesap Durumu (Aktif/Pasif)", "Müşterinin portföy aktiflik durumunu değiştirmek istediğinize emin misiniz?", SweetAlertIcons.QUESTION)
    if (!confirmed) return
    dispatch(fetchStart());
    try {
      await axiosWithToken.patch(`customers/${id}/status`);
      SweetNotify("Müşteri aktiflik durumu başarıyla güncellendi. (Aktif/Pasif)", SweetAlertIcons.SUCCESS)
    } catch (error) {
      handleError(error, "Müşteri Aktif/Pasif durumu değiştirilirken beklenmedik bir hata oluştu!");
    }
  };
    
  const deleteCustomer = async (id) => {
    const confirmed = await SweetConfirm("Müşteriyi Sil", "Bu mülk sahibini sistemden kalıcı olarak silmek istediğinize emin misiniz?", SweetAlertIcons.QUESTION)
    if (!confirmed) return //Exit if user cancels delete
    dispatch(fetchStart());
    try {
      await axiosWithToken.delete(`customers/${id}`)
      SweetNotify("Müşteri kaydı sistemden tamamen kaldırıldı.", SweetAlertIcons.SUCCESS)
    } catch (error) {
      handleError(error, "Müşteri kaydı silinirken bir hata oluştu!");
    }
  };

  const deleteCustomerNote = async (customerId, noteId, onSuccessCallback) => {
    const confirmed = await SweetConfirm("Notu Sil", "Bu notu kalıcı olarak geçmişten kaldırmak istediğinize emin misiniz?", SweetAlertIcons.QUESTION)
    if (!confirmed) return
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.delete(`/customers/${customerId}/note/${noteId}`);
      
      // Instantly inject modified record payload back into core states mapping structures
      dispatch(setData({ endpoint: "customer", data: data?.data }));
      
      SweetNotify(data?.message, SweetAlertIcons.SUCCESS);
      if (onSuccessCallback) onSuccessCallback();
    } catch (error) {
      handleError(error, "Not silinirken bir hata oluştu!")
    }
  };

  return {getSingleCustomerData, postCustomerData, putCustomerData, toggleCustomerStatus, deleteCustomer, deleteCustomerNote}
}

export default useCustomerCall
