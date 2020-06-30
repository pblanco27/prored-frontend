import Validator from "../../helpers/Validations";
import swal from "sweetalert";
import authService from "../../services/AuthService";

export function validateUser(user) {
  let error = false;
  error =
    !Validator.validateSimpleTextJquery(
      user.email,
      "userEmailError",
      80,
      "email"
    ) || error;
  error =
    !Validator.validateLengthJquery(user.password, "userPasswordError", 40) ||
    error;
  return !error;
}

export async function login() {
  const user = {
    email: this.state.email,
    password: this.state.password,
  };
  if (validateUser(user)) {
    const res = await authService.authenticate(user);
    if (res) {
      this.props.updateLogged();
      this.props.history.push(`/`);
    } else {
      swal("¡Atención!", "No existe un usuario con esas credenciales.", "info");
    }
  }
}
