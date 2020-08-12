import Validator from "../../helpers/Validations";
import { post_request } from "../../helpers/Request";
import swal from "sweetalert";

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
    const res = await post_request(`resetPassword`, newPassword);
    if (res.status){
      swal("¡Listo!", "Contraseña actualizada exitosamente.", "success").then(
        () => {
          this.props.history.push(`/iniciar-sesion`);
        }
      );
    }
  }
}
