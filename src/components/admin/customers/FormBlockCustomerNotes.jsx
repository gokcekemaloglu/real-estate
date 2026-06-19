import React from 'react'
import useCustomerCall from '../../../hooks/useCustomerCall'
import { useState } from 'react'

const FormBlockCustomerNotes = ({customerId, notes}) => {
  const {putCustomerData} = useCustomerCall()
  const [newNote, setNewNote] = useState("")

  const handleAddNote = async (e) => {
    e.preventDefault()
    if (!newNote.trim()) return

    const updatedNotes = [...notes, {content: newNote.trim()}]

    await putCustomerData(customerId, {note: updatedNotes})
  }

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 flex flex-col gap-4 shadow-sm h-132.5">
      <h3 className="text-xs uppercase tracking-widest text-brand-gold font-medium border-b border-slate-100 dark:border-slate-800/60 pb-2">
        2. Müşteri Görüşme Notları
      </h3>

      {/* Rapid Log Insertion Submission Form */}
      <form onSubmit={handleAddNote} className="flex flex-col gap-2">
        <textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Cemal Bey, bu portföy sahibiyle ilgili yeni bir not girin... (Örn: Fiyatta indirim yapabileceğini söyledi)"
          rows="3"
          className="input-premium bg-slate-50/50 dark:bg-slate-950/20 p-3 leading-relaxed resize-none text-[11px]"
        />
        <button
          type="submit"
          className="bg-brand-gold hover:bg-amber-700 text-white font-medium uppercase tracking-widest text-[9px] py-2 px-4 transition-all duration-200 cursor-pointer text-center"
        >
          Notu Geçmişe Ekle
        </button>
      </form>

      {/* Premium Historical Interaction Logs Timeline Stream */}
      <div className="flex-1 overflow-y-auto pr-1 flex flex-col gap-4 mt-2 custom-scrollbar">
        {notes && notes.length > 0 ? (
          [...notes].reverse().map((note, index) => (
            <div key={note._id || index} className="relative pl-4 border-l border-brand-gold/40 flex flex-col gap-1">
              {/* Luxury square timeline node anchor */}
              <div className="absolute left-[-3.5px] top-1 w-1.5 h-1.5 bg-brand-gold"></div>
              
              {/* Interaction log history timestamp indicator */}
              <span className="text-[9px] text-slate-400 dark:text-slate-500 font-mono uppercase tracking-wider">
                {note.createdAt ? new Date(note.createdAt).toLocaleString("tr-TR") : "Şimdi"}
              </span>
              
              {/* Log record textual content block */}
              <p className="text-[11px] font-light text-slate-600 dark:text-slate-300 bg-slate-50/40 dark:bg-slate-950/10 p-2 border border-slate-100 dark:border-slate-800/60 leading-relaxed wrap-break-word">
                {note.content}
              </p>
            </div>
          ))
        ) : (
          <div className="flex-1 flex items-center justify-center text-slate-400 dark:text-slate-500 italic text-center p-4">
            Bu mülk sahibine ait henüz geçmiş bir görüşme notu bulunmuyor.
          </div>
        )}
      </div>
    </div>
  )
}

export default FormBlockCustomerNotes