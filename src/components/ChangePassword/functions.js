import Validator from "../../helpers/Validations";
import { put_request } from "../../helpers/Request";
import swal from "sweetalert";

export function validatePassword() {
  let error = false;
  error =
    !Validator.validateLengthJquery(
      this.state.old_password,
      "userOldPasswordError",
      40
    ) || error;
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

export async function changePassword() {
  if (this.validatePassword()) {
    const passwords = {
      oldPassword: this.state.old_password,
      newPassword: this.state.new_password,
    };
    const res = await put_request(`updatePassword`, passwords);
    if (res.status) {
      const msg = res.data.msg;
      if (msg !== "Error") {
        swal(
          "¡Listo!",
          "Contraseña actualizada exitosamente. Por motivos de seguridad, se cerrará su sesión",
          "success"
        ).then(() => {
          localStorage.clear();
          this.props.history.push(`/iniciar-sesion`);
        });
      } else {
        swal(
          "¡Atención!",
          "La contraseña actual ingresada es incorrecta.",
          "warning"
        );
      }
    }
  }
}
