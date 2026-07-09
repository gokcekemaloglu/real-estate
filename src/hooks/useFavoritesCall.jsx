import { useDispatch, useSelector } from "react-redux";
import useAxios from "./useAxios";
import { fetchFail, fetchStart, setFavoritesData, updateFavoriteIds } from "../features/favoritesSlice";
import { SweetAlertIcons, SweetNotify } from "../helper/SweetNotify";

const useFavoritesCall = () => {
  const dispatch = useDispatch();
  const axiosWithToken = useAxios();
  const { token } = useSelector((state) => state.auth);

  const handleError = (error, fallbackMsg) => {
    const errorMsg = error?.response?.data?.message || fallbackMsg;
    dispatch(fetchFail(errorMsg));
    SweetNotify(errorMsg, SweetAlertIcons.ERROR);
  };

  // 1. Fetch user's active favorites bookmarks straight from backend upon logins
  const getMyFavorites = async () => {
    if (!token) return;
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.get("/favorites");
      dispatch(setFavoritesData(data?.data || []));
    } catch (error) {
      handleError(error, "Favori verileri yüklenirken beklenmedik bir hata oluştu!");
    }
  };

  // 2. Toggle Favorite (Like / Unlike) engine mapping backend constraints
  const toggleFavorite = async (propertyId) => {
    if (!token) return;

    // Optimistic UI Update: Flip heart icon color immediately on frontend for seamless premium luxury speed!
    dispatch(updateFavoriteIds(propertyId));

    try {
      const { data } = await axiosWithToken.post("/favorites/toggle", {
        propertyId,
      });

      // If backend confirms mutation, refresh the source of truth arrays smoothly
      const { data: updatedList } = await axiosWithToken.get("/favorites");
      dispatch(setFavoritesData(updatedList?.data || []));

      // Optional premium toast feedback message triggers
      // SweetNotify(data?.message, SweetAlertIcons.SUCCESS);
    } catch (error) {
      // Rollback UI to previous state if network fail
      dispatch(updateFavoriteIds(propertyId));
      handleError(error, "Favori durumu güncellenirken bir hata oluştu!");
    }
  };
  return { getMyFavorites, toggleFavorite };
};

export default useFavoritesCall;
