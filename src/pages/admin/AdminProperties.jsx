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
import AdminOwnerFilter from "../../components/admin/properties/form/AdminOwnerFilter";

const AdminProperties = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { fetchData } = useFetchData();
  const { togglePropertyStatus, toggleFeaturedStatus, deleteProperty } = usePropertyCall();

  const { properties, loading, propertyImages, propertiesDetails } = useSelector((state) => state.property);

  const activePage = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  // Radar layout re-fetching records data dynamically inside admin dashboard scopes
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
      isWithToken: true,
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
      limit: 200, // Fetch a broad buffer list to map list thumbnail images cleanly
      isWithToken: true,
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

  return (
    <div className="flex flex-col gap-4 animate-fade-in">
      {/* Top action toolbar header block */}
      <AdminPropertyHeader />

      <PropertyFilters/>

      <AdminOwnerFilter/>

      <div className={`transition-all duration-300 relative ${loading ? "opacity-40 pointer-events-none" : "opacity-100"}`} >
      {/* Hybrid Hybrid Row Cards Wrapper Framework */}
      <div className="flex flex-col gap-4 mt-4">
        {properties?.map((property) => (
          <AdminPropertyRow
            key={property._id}
            property={property}
            propertyImages={propertyImages}
            onStatusToggle={handleStatusToggle}
            onDeleteClick={handleDelete}
            onEditClick={() => navigate(`/admin/properties/edit/${property?._id}`)}
            onDetailClick={() => navigate(`/admin/properties/detail/${property?._id}`)}
          />
        ))}
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
