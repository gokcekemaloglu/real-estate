import React from 'react'
import PropertyHeader from '../components/properties/PropertyHeader'
import PropertyFilters from '../components/properties/PropertyFilters'
import PropertyCard from '../components/properties/PropertyCard'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import useFetchData from '../hooks/useFetchData'
import { useSearchParams } from 'react-router-dom'
import { fetchFail, fetchStart, setData } from '../features/propertySlice'
import PaginationComponent from '../components/properties/PaginationComponent'

const Properties = () => {
  const [searchParams] = useSearchParams()
  const {fetchData} = useFetchData()

  const {properties, loading, propertiesDetails} = useSelector(state => state.property)

  // console.log("Properties-->", properties);
  const activePage = searchParams.get("page") ? Number(searchParams.get("page")) : 1

  useEffect(() => {
    const activeParams = new URLSearchParams(searchParams)
    activeParams.delete("page")
    // const currentQueryString = activeParams.toString()
    const encryptedQueryString = activeParams.toString()
    const cleanBracketsQueryString = decodeURIComponent(encryptedQueryString)
    fetchData({
      endpoint: "properties",
      stateKey: "properties",
      sliceActions: {fetchStart, fetchFail, setData},
      page: activePage,
      limit:12, 
      query: cleanBracketsQueryString // Directly passes the pristine query format backend controller expects
    })
  }, [activePage, searchParams])

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-brand-dark pt-32 pb-24 font-display transition-colors duration-300 relative overflow-hidden">
      {/* Background Luxury Line Grid using Tailwind v4 syntax */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-5 bg-[linear-gradient(to_right,#b45309_1px,transparent_1px),linear-gradient(to_bottom,#b45309_1px,transparent_1px)] bg-size-[4rem_4rem]"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <PropertyHeader/>

        {/* Premium Horizontal Filter Bar (Baseline HTML inputs for upcoming Formik integration) */}
        <PropertyFilters/>
        
        {loading ? (
          <div className="flex items-center justify-center min-h-100">
            <div className="w-12 h-12 border-2 border-slate-300 border-t-brand-gold rounded-full animate-spin"></div>
          </div>
        ) : (
          <>
            {/* Core Showcase Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {properties?.map((singleProperty) => (
                <PropertyCard property={singleProperty} key={singleProperty._id}/>
              ))}
            </div>
            <PaginationComponent details={propertiesDetails}/>
          </>
        )}

      </div>
    </div>
  )
}

export default Properties
