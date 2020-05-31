import Validator from "./Validations";

export function validateStudent(student, resident) {
  let error = false;
  error =
    !Validator.validateSimpleTextJquery(
      student.name,
      "studentNameError",
      40,
      "name"
    ) || error;
  error =
    !Validator.validateSimpleTextJquery(
      student.lastname1,
      "studentLastName1Error",
      40,
      "name"
    ) || error;
  error =
    !Validator.validateSimpleTextJquery(
      student.lastname2,
      "studentLastName2Error",
      40,
      "name"
    ) || error;
  error =
    !Validator.validateSimpleSelectJquery(
      student.born_dates,
      "studentDateError"
    ) || error;
  error =
    !Validator.validateSimpleTextJquery(
      student.dni,
      "studentDniError",
      40,
      "dni"
    ) || error;
  error =
    !Validator.validateSimpleSelectJquery(
      student.nationality,
      "countrySelectError"
    ) || error;
  if (resident) {
    error =
      !Validator.validateSimpleSelectJquery(
        student.id_district,
        "districtError"
      ) || error;
  }
  error =
    !Validator.validateSimpleSelectJquery(
      student.campus_code,
      "selectCampusError"
    ) || error;
  error =
    !Validator.validateSimpleSelectJquery(
      student.careers,
      "selectCareerError"
    ) || error;
  if (student.profile === "Avanzado" || student.profile === "Medio") {
    error =
      !Validator.validateSimpleSelectJquery(
        student.languages,
        "selectLanguageError"
      ) || error;
  }
  error =
    !Validator.validateSimpleTextJquery(
      student.phone_number,
      "studentPhoneError",
      40,
      "phone"
    ) || error;
  error =
    !Validator.validateSimpleTextJquery(
      student.emergency_contact,
      "studentEmergencyError",
      40,
      "phone",
      true
    ) || error;
  error =
    !Validator.validateSimpleTextJquery(
      student.email,
      "studentEmailError",
      40,
      "email"
    ) || error;
  return !error;
}
/**
 * 40
 * 60
 */
