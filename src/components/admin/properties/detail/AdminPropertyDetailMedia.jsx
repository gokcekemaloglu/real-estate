import React, { useEffect } from "react";
import useFetchData from "../../../../hooks/useFetchData";
import { useSelector } from "react-redux";
import { setData } from "../../../../features/propertySlice";
import PropertyMediaGallery from "../../../properties/PropertyMediaGallery";
import { getListingBadge, getListingBadgeStyle } from "../../../../helper/listingTypeLabels";

const AdminPropertyDetailMedia = ({ property }) => {
  const { fetchData } = useFetchData();
  const { currentPropertyImages } = useSelector((state) => state.property);

  useEffect(() => {
    if (property?._id) {
      fetchData({
        endpoint: "property-images",
        stateKey: "currentPropertyImages",
        sliceActions: {
          fetchStart: () => ({ type: "property/noOpStart" }), // Safely bypass global page-unmounting spinners
          fetchFail: () => ({ type: "property/noOpFail" }),
          setData,
        },
        query: `filter[propertyId]=${property._id}`,
      });
    }
  }, [property?._id]);

  const isolatedImages =
    currentPropertyImages?.filter(
      (image) => image.propertyId === property?._id,
    ) || [];

  const badges = (
    <>
      <span className={`text-[10px] uppercase font-bold tracking-widest px-2 py-1 border shadow-2xs font-sans ${getListingBadgeStyle(property?.listingType)} w-24 text-center`}>
        {getListingBadge(property?.listingType)}
      </span>
      {property?.isFeatured && (
        <span className="text-[12px] uppercase font-bold tracking-widest px-3 py-1 bg-amber-500 text-brand-dark shadow-sm">
          Vitrin İlanı
        </span>
      )}
    </>
  );

  return (
    <PropertyMediaGallery
      images={isolatedImages}
      altText={property?.title}
      badges={badges}
      heroHeightClass="h-80"
      containerBgClass="bg-slate-100 dark:bg-slate-950"
      thumbLabel="Galeri Fotoğrafları"
    />
  );
};

export default AdminPropertyDetailMedia;
