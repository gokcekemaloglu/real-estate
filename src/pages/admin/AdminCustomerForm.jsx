import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useCustomerCall from '../../hooks/useCustomerCall'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import FormBlockCustomerInfo from '../../components/admin/customers/FormBlockCustomerInfo'
import FormBlockCustomerNotes from '../../components/admin/customers/FormBlockCustomerNotes'
import { useFormik } from 'formik'
import { CustomerSchema } from '../../helper/ValidationSchemas'

const AdminCustomerForm = () => {
  const {id} = useParams()
  const navigate =useNavigate()
  const {getSingleCustomerData, postCustomerData, putCustomerData} = useCustomerCall()
  const {customer, loading} = useSelector(state => state.customers)
  const isEditMode = Boolean(id)

  useEffect(() => {
    if (isEditMode) {
      getSingleCustomerData(id)
    }
  }, [id])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: isEditMode ? customer?.firstName : '',
      lastName: isEditMode ? customer?.lastName : '',
      phone: isEditMode ? customer?.phone : '',
      email: isEditMode ? customer?.email : '',
      address: isEditMode ? customer?.address : '',
      citizenshipId: isEditMode ? customer?.citizenshipId : '',
      isActive: isEditMode ? customer?.isActive : true
    },
    validationSchema: CustomerSchema,
    onSubmit: async (values) => {
      const cleanValues = {
        ...values,
        firstName: values.firstName.trim(),
        lastName: values.lastName.trim(),
        phone: values.phone.trim(),
        email: values.email ? values.email.trim() : '',
        address: values.address ? values.address.trim() : '',
        citizenshipId: values.citizenshipId ? values.citizenshipId.trim() : ''
      }
      
      if (isEditMode) {
        await putCustomerData(id, cleanValues)
      } else {
        await postCustomerData("customers", cleanValues)
      }
      navigate("/admin/customers")
    }
  })

  if (loading && isEditMode) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <div className="w-10 h-10 border-2 border-slate-200 border-t-brand-gold rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 animate-fade-in max-w-5xl text-xs font-light text-slate-700 dark:text-slate-300">
      
      {/* Header Context Toolbar Block */}
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
        <div>
          <h1 className="text-lg font-serif text-slate-800 dark:text-white font-light tracking-wide">
            {isEditMode ? "Müşteri Kartı Güncelleme" : "Yeni Müşteri & Portföy Kaydı"}
          </h1>
          <p className="text-[11px] text-slate-400 uppercase tracking-widest mt-0.5">
            {isEditMode ? `${customer?.firstName} ${customer?.lastName} portföy kartı detaylarını revize edin` : "Sisteme yeni bir mülk sahibi/müşteri ekleme formu"}
          </p>
        </div>
        <button type="button" onClick={() => navigate("/admin/customers")} className="text-xs uppercase tracking-widest text-slate-400 hover:text-brand-gold transition-colors cursor-pointer">
          ← Vazgeç / Geri Dön
        </button>
      </div>

      {/* Main Layout Framework: Isolating historical logs into the right-hand sidebar layout column */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Left 2 Columns: Core Customer Identification and Registry Form Blocks */}
        <form onSubmit={formik.handleSubmit} className="lg:col-span-1 flex flex-col gap-6">
          <FormBlockCustomerInfo formik={formik} />
          
          <div className="flex justify-end mt-2">
            <button type="submit" className="btn-premium px-12 py-4 font-semibold tracking-widest text-xs uppercase shadow-lg w-full sm:w-auto">
              {isEditMode ? "Değişiklikleri Kaydet / Güncelle" : "Müşteriyi Kaydet / Portföye Ekle"}
            </button>
          </div>
        </form>

        {/* Right 1 Column: Historical Interaction Logs and Meeting Summaries Timeline Stream */}
        <div className="lg:col-span-1 h-full">
          {isEditMode ? (
            <FormBlockCustomerNotes customerId={id} notes={customer?.note || []} />
          ) : (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 flex flex-col gap-3 shadow-sm text-slate-400 dark:text-slate-500 leading-relaxed">
              <h3 className="text-xs uppercase tracking-widest text-brand-gold font-medium border-b border-slate-100 dark:border-slate-800/60 pb-2">
                💡 Cemal Bey İçin Not
              </h3>
              Müşteriye ait özel telefon görüşmeleri, pazarlık geçmişi ve takip notları ekleme paneli, <strong>müşteri sisteme ilk kez eklendikten sonra</strong> bu sağ alanda aktif olacaktır.
            </div>
          )}
        </div>
      </div>

    </div>
  )
}

export default AdminCustomerForm