import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import { useSelector } from 'react-redux'
import { PropertySchema } from '../../helper/ValidationSchemas'
import usePropertyCall from '../../hooks/usePropertyCall'
import { fetchStart as custStart, fetchFail as custFail, setData as custSet } from '../../features/customerSlice'
import { isRentType, listingTypeOptions, rentPeriodOptions, categoryOptions, heatingOptions, districtOptions, occupancyOptions } from '../../helper/propertyOptions'
import FormBlockTitle from '../../components/admin/properties/form/FormBlockTitle'
import FormBlockPrice from '../../components/admin/properties/form/FormBlockPrice'
import FormBlockLocation from '../../components/admin/properties/form/FormBlockLocation'
import FormBlockSpecs from '../../components/admin/properties/form/FormBlockSpecs'
import FormBlockToggles from '../../components/admin/properties/form/FormBlockToggles'
import FormBlockOwner from '../../components/admin/properties/form/FormBlockOwner'
import useFetchData from '../../hooks/useFetchData'
import FormBlockImage from '../../components/admin/properties/form/FormBlockImage'

const AdminPropertyForm = () => {
  const { id } = useParams() // Captures dynamic ID from URL bar to automatically switch to EDIT mode
  const navigate = useNavigate()
  const { postPropertyData, putPropertyData, getSinglePropertyData } = usePropertyCall()
  const { fetchData } = useFetchData()
  const { property, loading } = useSelector((state) => state.property)
  const { customers } = useSelector((state) => state.customers)

  const isEditMode = Boolean(id)

  // 1. Fetch existing estate records data instantly on viewport mounts if running under Edit mode
  useEffect(() => {
    if (isEditMode) {
      getSinglePropertyData(id)
    }
  }, [id])

  useEffect(() => {
    fetchData({
      endpoint: "customers",
      stateKey: "customers",
      sliceActions: { fetchStart: custStart, fetchFail: custFail, setData: custSet },
      page: 1,
      limit: 100, // Fetch a wide list to populate the dropdown filter completely
    });
  }, []);

  const formik = useFormik({
    enableReinitialize: true, // IMPORTANT: Forces Formik to auto-populate inputs as soon as Redux fills up
    initialValues: {
      title: isEditMode ? property?.title : '',
      description: isEditMode ? property?.description : '',
      price: isEditMode ? property?.price : '',
      listingType: isEditMode ? property?.listingType : '',
      rentPeriod: isEditMode ? (property?.rentPeriod ?? '') : '',
      propertyCategory: isEditMode ? property?.propertyCategory : '',
      city: 'Adana',
      district: isEditMode ? property?.district : '',
      neighbourhood: isEditMode ? property?.neighbourhood : '',
      fullAddress: isEditMode ? property?.fullAddress : '',
      grossArea: isEditMode ? property?.grossArea : '',
      netArea: isEditMode ? property?.netArea : '',
      floor: isEditMode ? property?.floor : '',
      totalFloors: isEditMode ? property?.totalFloors : '',
      roomCount: isEditMode ? property?.roomCount : '',
      bathroomCount: isEditMode ? (property?.bathroomCount ?? '') : '',
      buildingAge: isEditMode ? property?.buildingAge : '',
      heatingType: isEditMode ? property?.heatingType : 'none',
      maintenanceFee: isEditMode ? (property?.maintenanceFee ?? '') : '',
      occupancyStatus: isEditMode ? (property?.occupancyStatus ?? '') : '',
      isFurnished: isEditMode ? property?.isFurnished : false,
      hasElevator: isEditMode ? property?.hasElevator : false,
      hasParking: isEditMode ? property?.hasParking : false,
      isLoanEligible: isEditMode ? property?.isLoanEligible : true,
      ownerId: isEditMode ? (property?.ownerId?._id ?? property?.ownerId ?? '') : ''
    },
    validationSchema: PropertySchema,
    onSubmit: async (values) => {
      const cleanValues = {
        ...values,
        price: Number(values.price),
        grossArea: values.grossArea ? Number(values.grossArea) : null,
        netArea: values.netArea ? Number(values.netArea) : null,
        floor: values.floor !== '' ? Number(values.floor) : null,
        totalFloors: values.totalFloors ? Number(values.totalFloors) : null,
        buildingAge: values.buildingAge !== '' ? Number(values.buildingAge) : null,
        maintenanceFee: values.maintenanceFee !== '' ? Number(values.maintenanceFee) : null,
        occupancyStatus: values.occupancyStatus || null,
        rentPeriod: isRentType(values.listingType) ? (values.rentPeriod || null) : null,
      }
      
      if (isEditMode) {
        await putPropertyData(id, cleanValues)
      } else {
        await postPropertyData("properties", cleanValues)
      }
      navigate("/admin/properties")
    }
  })

  useEffect(() => {
    if (formik.touched.listingType && !isRentType(formik.values.listingType) && formik.values.rentPeriod) {
      formik.setFieldValue('rentPeriod', '')
    }
  }, [formik.values.listingType])

  const customerOptions = customers?.map(customer => ({
    value: customer._id,
    label: `${customer.firstName} ${customer.lastName} (${customer.phone})`
  })) || []

  if (loading && isEditMode) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <div className="w-10 h-10 border-2 border-slate-200 border-t-brand-gold rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 animate-fade-in max-w-4xl text-xs font-light text-slate-700 dark:text-slate-300">
      
      {/* Header Context Toolbar Block */}
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <h1 className="text-xl font-serif text-slate-800 dark:text-white font-light tracking-wide">
            {isEditMode ? "Portföy Kartı Güncelleme" : "Yeni Portföy Kaydı"}
          </h1>
          <p className="text-[12px] text-slate-400 uppercase tracking-widest mt-0.5">
            {isEditMode ? `${property?.title} → ilan kartı detaylarını revize edin` : "Sisteme yeni bir lüks mülk kartı ekleme formu"}
          </p>
        </div>
        <button type="button" onClick={() => navigate("/admin/properties")} className="text-xs uppercase tracking-widest text-slate-400 hover:text-brand-gold transition-colors cursor-pointer">
          ← Vazgeç / Geri Dön
        </button>
      </div>

      {/* Main Unified Submission Form Framework */}
      <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6">
        <FormBlockImage propertyId={id} isEditMode={isEditMode}/>
        <FormBlockTitle formik={formik}/>
        <FormBlockPrice formik={formik} listingTypeOptions={listingTypeOptions} categoryOptions={categoryOptions} rentPeriodOptions={rentPeriodOptions} />
        <FormBlockLocation formik={formik} districtOptions={districtOptions} />
        <FormBlockOwner formik={formik} customerOptions={customerOptions} />
        <FormBlockSpecs formik={formik} heatingOptions={heatingOptions} occupancyOptions={occupancyOptions} />
        <FormBlockToggles formik={formik} />

        <div className="flex justify-end mt-2">
          <button type="submit" className="btn-premium px-12 py-4 font-semibold tracking-widest text-xs uppercase shadow-lg w-full md:w-auto">
            {isEditMode ? "Değişiklikleri Kaydet / Güncelle" : "İlanı Canlıya Al / Portföye Ekle"}
          </button>
        </div>
      </form>

    </div>
  )
}

export default AdminPropertyForm
