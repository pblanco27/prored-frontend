import Validator from "./Validations";

export function validateUser(user) {
  let error = false;
  error =
    !Validator.validateSimpleTextJquery(
      user.name,
      "userNameError",
      40,
      "name"
    ) || error;
  error =
    !Validator.validateSimpleTextJquery(
      user.lastname1,
      "userLastName1Error",
      40,
      "name"
    ) || error;
  error =
    !Validator.validateSimpleTextJquery(
      user.lastname2,
      "userLastName2Error",
      40,
      "name"
    ) || error;
  error =
    !Validator.validateSimpleTextJquery(
      user.email,
      "userEmailError",
      40,
      "email"
    ) || error;
  return !error;
}
