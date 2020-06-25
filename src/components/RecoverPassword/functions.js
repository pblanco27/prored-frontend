import swal from "sweetalert";
import { API } from "../../services/env";
import axios from "axios";
import Validator from "../../helpers/Validations";

export function validatePassword() {
  let error = false;
  error =
    !Validator.validateSimpleTextJquery(
      this.state.new_password,
      "userNewPasswordError",
      40,
      "password"
    ) || error;
  error =
    !Validator.validatePasswordMatchJquery(
      this.state.new_password,
      this.state.password_confirm,
      "userPasswordConfirmError"
    ) || error;
  return !error;
}

export async function resetPassword() {
  if (this.validatePassword()) {
    const newPassword = {
      id_user: this.state.id_user,
      password: this.state.new_password,
    };
    const res = await axios.post(`${API}/resetPassword`, newPassword);
    if (res.status === 200) {
      swal("¡Listo!", "Contraseña actualizada exitosamente.", "success").then(
        () => {
          this.props.history.push(`/iniciar-sesion`);
        }
      );
    } else {
      swal(
        "¡Atención!",
        "Ha ocurrido un error al intentar actualizar la contraseña.",
        "warning"
      );
    }
  }
}
