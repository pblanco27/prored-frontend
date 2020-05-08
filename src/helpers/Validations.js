class Validation {
  regList = {
    textSpecial: {
      reg: /^[\wáéíóúüñÁÉÍÓÚÜÑ\s.,()-]+$/,
      error:
        "Este campo puede tener únicamente letras, números, espacios y los siguientes caracteres: - _ . , ()",
    },
    onlyNumber: {
      reg: /^[0-9]+$/,
      error: "Este campo puede tener únicamente números",
    },
  };
  /**
   * ModalCampus
   * ModalCareer
   */
  validateSimpleText(value, element_ref, maxLength, reg) {
    let error = "";
    if (value === "") {
      error = "Este campo no puede ir vacío";
    } else if (value.length > maxLength) {
      error = `Este campo puede tener un máximo de ${maxLength} caracteres`;
    } else if (!this.regList[reg].reg.test(value)) {
      error = this.regList[reg].error;
    }
    element_ref.innerText = error;
    error !== ""
      ? (element_ref.style.display = "block")
      : (element_ref.style.display = "none");

    return error !== "";
  }

  validateSimpleSelect(value, element_ref) {
    let error = "";
    if (value === "") {
      error = "Debe seleccionar una opción de la lista";
    }
    element_ref.innerText = error;
    error !== ""
      ? (element_ref.style.display = "block")
      : (element_ref.style.display = "none");
    return error !== "";
  }
}

const validation = new Validation();

export default validation;
