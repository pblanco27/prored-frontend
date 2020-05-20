import $ from "jquery";
class Validation {
  regList = {
    textSpecial: {
      reg: /^[\wáéíóúüñÁÉÍÓÚÜÑ\s.,()#-]+$/,
      error:
        "Este campo puede tener únicamente letras, números, espacios y los siguientes caracteres: - _ . , () #",
    },
    onlyNumber: {
      reg: /^[0-9]+$/,
      error: "Este campo puede tener únicamente números",
    },
    name: {
      reg: /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s-]+$/,
      error: "Este campo puede tener únicamente letras y espacios",
    },
    dni: {
      reg: /^[\w-]+$/,
      error: "Este campo puede tener únicamente números, letras y guiones",
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
    return this.responseRef(element_ref, error);
  }

  validateSimpleSelect(value, element_ref) {
    let error = "";
    if (
      value === "" ||
      value === 0 ||
      JSON.stringify(value) === JSON.stringify([])
    ) {
      error = "Debe seleccionar una opción de la lista";
    }
    return this.responseRef(element_ref, error);
  }

  responseRef(element_ref, error) {
    element_ref.innerText = error;
    error !== ""
      ? (element_ref.style.display = "block")
      : (element_ref.style.display = "none");
    return error !== "";
  }

  validateSimpleSelectJquery(value, element_id) {
    let error = "";
    element_id = `#${element_id}`;
    if (
      value === "" ||
      value === 0 ||
      JSON.stringify(value) === JSON.stringify([])
    ) {
      error = "Debe seleccionar una opción de la lista";
    }
    return this.responseJquery(element_id, error);
  }

  validateSimpleTextJquery(value, element_id, maxLength, reg) {
    let error = "";
    element_id = `#${element_id}`;
    if (value === "") {
      error = "Este campo no puede ir vacío";
    } else if (value.length > maxLength) {
      error = `Este campo puede tener un máximo de ${maxLength} caracteres`;
    } else if (!this.regList[reg].reg.test(value)) {
      error = this.regList[reg].error;
    }
    return this.responseJquery(element_id, error);
  }

  responseJquery(element_id, error) {
    $(element_id).text(error);
    if (error !== "") {
      $(element_id).show();
    } else {
      $(element_id).hide();
    }
    return error === "";
  }
}

const validation = new Validation();

export default validation;
