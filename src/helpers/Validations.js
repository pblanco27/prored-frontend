/**
 * ModalCampus
 */
export function validateSimpleText(value, element_ref, maxLength) {
  let error = "";
  const reg = /^[\wáéíóúüñÁÉÍÓÚÜÑ\s.,()-]+$/;
  if (value === "") {
    error = "Este campo no puede ir vacío";
  } else if (value.length > maxLength) {
    error = `Este campo puede tener un máximo de ${maxLength} caracteres`;
  } else if (!reg.test(value)) {
    error =
      "Este campo puede tener únicamente letras, números, espacios y los siguientes caracteres: - _ . , ()";
  }
  element_ref.innerText = error;
  error !== ""
    ? (element_ref.style.display = "block")
    : (element_ref.style.display = "none");

  return error !== "";
}
