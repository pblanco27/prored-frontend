import Validator from "../../helpers/Validations";
export function createResearcherObject() {
  const researcher = {
    dni: this.state.dni,
    name: this.state.name,
    lastname1: this.state.lastname1,
    lastname2: this.state.lastname2,
    born_dates: this.state.born_dates,
    email: this.state.email,
    phone_number: this.state.phone_number,
    id_inv_unit: this.state.id_inv_unit,
  };
  return researcher;
}

export function validateResearcher(researcher) {
  let error = false;
  error =
    !Validator.validateSimpleTextJquery(
      researcher.name,
      "researcherNameError",
      40,
      "name"
    ) || error;
  error =
    !Validator.validateSimpleTextJquery(
      researcher.lastname1,
      "researcherLastName1Error",
      40,
      "name"
    ) || error;
  error =
    !Validator.validateSimpleTextJquery(
      researcher.lastname2,
      "researcherLastName2Error",
      40,
      "name"
    ) || error;
  error =
    !Validator.validateSimpleSelectJquery(
      researcher.born_dates,
      "researcherDateError"
    ) || error;
  error =
    !Validator.validateSimpleTextJquery(
      researcher.dni,
      "researcherDniError",
      40,
      "dni"
    ) || error;
  error =
    !Validator.validateSimpleSelectJquery(
      researcher.id_inv_unit,
      "selectInvestigationUnit"
    ) || error;
  error =
    !Validator.validateSimpleTextJquery(
      researcher.phone_number,
      "researcherPhoneError",
      40,
      "phone"
    ) || error;
  error =
    !Validator.validateSimpleTextJquery(
      researcher.email,
      "researcherEmailError",
      40,
      "email"
    ) || error;
  return !error;
}