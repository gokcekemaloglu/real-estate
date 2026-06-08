import Swal from "sweetalert2";

export const SweetAlertIcons = {
  WARNING: "warning",
  ERROR: "error",
  SUCCESS: "success",
  INFO: "info",
  QUESTION: "question",
};

export const SweetNotify = (msg, icon, timer = 5000) => {
  Swal.fire({
    title: "Görkem Emlak",
    text: msg,
    icon: icon,
    confirmButtonText: "Tamam",
    confirmButtonColor: "#0f172a",// brand-dark alignment
    timer,
    timerProgressBar: true,
  });
};

export const SweetConfirm = async (title, text, icon, confirmButtonText = "Evet", cancelButtonText = "İptal") => {
  const result = await Swal.fire({
    title,
    text,
    icon,
    showCancelButton: true,
    confirmButtonColor: "#b45309", // brand-gold alignment
    cancelButtonColor: "#64748b",  // neutral slate alignment
    confirmButtonText,
    cancelButtonText,
  });
  return result.isConfirmed;
};