import Validator from "../../helpers/Validations";
import swal from "sweetalert";
import { API } from "../../services/env";
import axios from "axios";

export function validateUser(user) {
  let error = false;
  error =
    !Validator.validateSimpleTextJquery(
      user.email,
      "userEmailError",
      40,
      "email"
    ) || error;
  error =
    !Validator.validateLengthJquery(
      user.password,
      "userPasswordError",
      40
    ) || error;
  return !error;
}

export async function login() {
  const user = {
    email: this.state.email,
    password: this.state.password,
  };
  if (validateUser(user)) {
    const res = await axios.post(`${API}/user/authenticate`, user);
    const token = res.data.token;
    const id_user = res.data.id_user;
    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("id_user", id_user);
      this.props.history.push(`/#`);
    } else {
      swal("¡Atención!", "No existe un usuario con esas credenciales.", "info");
    }
  }
}
