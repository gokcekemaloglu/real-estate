import { useNavigate, useParams } from 'react-router-dom'
import usePropertyCall from '../hooks/usePropertyCall'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import PropertyGallery from '../components/properties/PropertyGallery'
import PropertyDescription from '../components/properties/PropertyDescription'
import PropertyFeaturesPanel from '../components/properties/PropertyFeaturesPanel'

const PropertyDetail = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  const {getSinglePropertyData} = usePropertyCall()

  const {property, loading} = useSelector(state => state.property)

  useEffect(() => {
    if (id) {
      getSinglePropertyData(id)
    }
  }, [id])

  // console.log("property-->", property);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-brand-dark flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-slate-300 border-t-brand-gold rounded-full animate-spin"></div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-brand-dark pt-32 pb-24 font-display transition-colors duration-300 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-5 bg-[linear-gradient(to_right,#b45309_1px,transparent_1px),linear-gradient(to_bottom,#b45309_1px,transparent_1px)] bg-size-[4rem_4rem]"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Back Navigation Action Link */}
        <button 
          onClick={() => navigate("/properties")}
          className="text-xs uppercase tracking-widest text-slate-400 hover:text-brand-gold mb-8 flex items-center gap-2 transition-colors cursor-pointer"
        >
          ← Tüm İlanlara Dön
        </button>

        {/* Core Detail Grid Layout split into image presentation and structural specification metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column (7-Cols): Image Box Showcase */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <PropertyGallery title = {property?.title} listingType = {property?.listingType} propertyId={property?._id}/>
            
            {/* Description Paragraph Text Block */}
            <PropertyDescription description={property?.description}/>
            
          </div>

          {/* Right Column (5-Cols): Luxury Price, Title & Specs Dashboard */}
          <PropertyFeaturesPanel property={property}/>
          

        </div>
      </div>
    </div>
  )
}

export default PropertyDetail