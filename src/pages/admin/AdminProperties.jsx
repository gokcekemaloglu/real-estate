import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import useFetchData from "../../hooks/useFetchData";
import usePropertyCall from "../../hooks/usePropertyCall";
import { fetchStart, fetchFail, setData } from "../../features/propertySlice";
import AdminPropertyHeader from "../../components/admin/properties/list/AdminPropertyHeader";
import AdminPropertyRow from "../../components/admin/properties/list/AdminPropertyRow";
import { useNavigate, useSearchParams } from "react-router-dom";
import PaginationComponent from "../../components/properties/PaginationComponent";
import PropertyFilters from "../../components/properties/PropertyFilters";
import AdminOwnerFilter from "../../components/admin/AdminOwnerFilter";
import AdminActiveFilter from "../../components/admin/AdminActiveFilter";
// import useFavoritesCall from "../../hooks/useFavoritesCall";

const AdminProperties = () => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const { fetchData } = useFetchData();
  const { togglePropertyStatus, toggleFeaturedStatus, deleteProperty } = usePropertyCall();
  // const { toggleFavorite } = useFavoritesCall();
  // const { favoriteIds } = useSelector((state) => state.favorites);

  const { properties, loading, propertyImages, propertiesDetails } = useSelector((state) => state.property);

  const activePage = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  const loadAdminPropertyData = () => {
    const activeParams = new URLSearchParams(searchParams);
    activeParams.delete("page");
    const encryptedQueryString = activeParams.toString();
    const cleanBracketsQueryString = decodeURIComponent(encryptedQueryString);
    fetchData({
      endpoint: "properties",
      stateKey: "properties",
      sliceActions: { fetchStart, fetchFail, setData },
      page: activePage,
      limit: 15,
      query: cleanBracketsQueryString,
    });
    fetchData({
      endpoint: "property-images",
      stateKey: "propertyImages",
      sliceActions: { 
        fetchStart: () => ({ type: "property/noOpStart" }), // Bypasses page blocking spinners completely
        fetchFail: () => ({ type: "property/noOpFail" }), 
        setData 
      },
      page: 1,
      limit: 200,
    });
  };

  useEffect(() => {
    loadAdminPropertyData();
  }, [activePage, searchParams]);

  const handleStatusToggle = async (id, type) => {
    if (type === "active") await togglePropertyStatus(id);
    if (type === "featured") await toggleFeaturedStatus(id);
    loadAdminPropertyData(); // Automatically refresh dataset to mirror single source of truth mutations
  };

  const handleDelete = async (id) => {
    await deleteProperty(id);
    loadAdminPropertyData();
  };

  const handleClearFilters = () => {
    setSearchParams({ page: "1" }, { replace: true })
    // window.location.reload()
  }

  return (
    <div className="flex flex-col gap-4 animate-fade-in">
      {/* Top action toolbar header block */}
      <AdminPropertyHeader />
      <PropertyFilters/>
      <div className="flex flex-col md:flex-row gap-2 items-start md:items-center justify-between">
        <AdminOwnerFilter/>
        <AdminActiveFilter label="İlan Yayın Durumu"/>
      </div>
      <div className={`transition-all duration-300 relative ${loading ? "opacity-40 pointer-events-none" : "opacity-100"}`} >
      {/* Hybrid Hybrid Row Cards Wrapper Framework */}
      <div className="flex flex-col gap-4 mt-4">
        {properties?.length > 0 ? (
          properties?.map((property) => (
          <AdminPropertyRow
            key={property._id}
            property={property}
            propertyImages={propertyImages}
            onStatusToggle={handleStatusToggle}
            onDeleteClick={handleDelete}
            onEditClick={() => navigate(`/admin/properties/edit/${property?._id}`)}
            onDetailClick={() => navigate(`/admin/properties/detail/${property?._id}`)}
            // isFavorite={favoriteIds?.includes(property?._id)}
            // onFavoriteToggle={toggleFavorite}
          />
        ))
        ) : (
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-12 text-center text-slate-400 uppercase tracking-widest text-xs font-light shadow-sm">
            <p className="text-sm font-light text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">Kriterlere uygun veya sistemde kayıtlı herhangi bir mülk portföyü bulunamadı.</p>
            <button 
              onClick={handleClearFilters}
              className="btn-premium px-6 py-3 text-xs tracking-widest font-semibold"
            >
              Filtreleri Temizle
            </button>
          </div>
        )}
      </div>
      <PaginationComponent details={propertiesDetails} label={"İlan"}/>
      </div>
        {loading && (
        <div className="absolute top-4 right-4 w-5 h-5 border-2 border-slate-300 border-t-brand-gold rounded-full animate-spin"></div>
      )}
    </div>
  );
};

export default AdminProperties;
