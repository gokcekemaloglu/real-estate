import React from "react";
import { useDispatch } from "react-redux";
import useAxios, { axiosPublic } from "./useAxios";
import { fetchFail, fetchStart, setData, setSingleData } from "../features/propertySlice";
import { SweetNotify } from "../helper/SweetNotify";

const usePropertyCall = () => {
  const dispatch = useDispatch();
  const axiosWithToken = useAxios();

  const handleError = (error, fallbackMsg) => {
    dispatch(fetchFail(error?.response?.data?.message || fallbackMsg));
    SweetNotify(error?.response?.data?.message || fallbackMsg);
  };

  const getPropertiesData = async (key = "properties", options) => {
    dispatch(fetchStart());
    try {
      const {data} = await axiosPublic(`${key}/`, options)
      dispatch(setData({key, data: data.data}))
    } catch (error) {
      handleError(error, `Something went wrong while fetching ${key}!`);
    }
  };

  const getSinglePropertyData = async (id) => {
    dispatch(fetchStart());
    try {
      const {data: {data}} = await axiosPublic(`properties/${id}/`)
      dispatch(setSingleData({key:"property", data}))
    } catch (error) {
      handleError(error, `Something went wrong while fetching the property with ID: ${id}`);
    }
  };

  const postPropertyData = async () => {
    dispatch(fetchStart());
    try {
      ("asd");
    } catch (error) {
      handleError(error, "`Something went wrong while fetching key!`");
    }
  };

  const putPropertyData = async () => {
    dispatch(fetchStart());
    try {
      ("asd");
    } catch (error) {
      handleError(error, "`Something went wrong while fetching key!`");
    }
  };

  const deletePropertyData = async () => {
    dispatch(fetchStart());
    try {
      ("asd");
    } catch (error) {
      handleError(error, "`Something went wrong while fetching key!`");
    }
  };

  return { getPropertiesData };
};

export default usePropertyCall;
