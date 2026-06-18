import React from "react";
import { useDispatch } from "react-redux";
import { SweetAlertIcons, SweetNotify } from "../helper/SweetNotify";
import useAxios, { axiosPublic } from "./useAxios";

const useFetchData = () => {
  const dispatch = useDispatch();
  const axiosWithToken = useAxios()

  const fetchData = async ({ endpoint, stateKey, sliceActions, page = 1, limit = 12, query = "", isWithToken = false }) => {
    // 1. Fire the specific slice's loading initialization phase triggers
    dispatch(sliceActions.fetchStart());
    try {
      // 2. Formulate clean query parameters appending optional third-party filter components
      const filterQuery = query ? `&${query}` : "";

      const axiosEngine = isWithToken ? axiosWithToken : axiosPublic

      // 3. Dispatch global request directly through pre-configured axios bundles
      const { data } = await axiosEngine.get(`/${endpoint}?page=${page}&limit=${limit}${filterQuery}`);

      // Dispatch A: Inject core records data array directly into state mapping location (e.g., state.properties)
      dispatch(sliceActions.setData({ endpoint: stateKey, data: data?.data }));

      // Dispatch B: Map standard pagination meta blocks into dedicated key variables (e.g., state.propertiesDetails)
      dispatch(sliceActions.setData({endpoint: `${stateKey}Details`, data: data?.details}));
    } catch (error) {
         // 4. Capture response exceptions gracefully and delegate error strings to targets
      const errorMsg = error?.response?.data?.message || "Veriler yüklenirken beklenmedik bir hata oluştu!";
      dispatch(sliceActions.fetchFail(errorMsg));
      SweetNotify(errorMsg, SweetAlertIcons.ERROR);
    }
  };

  return { fetchData };
};

export default useFetchData;
