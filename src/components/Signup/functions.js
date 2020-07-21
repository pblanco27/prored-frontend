import { validateUser } from "../../helpers/ValidateUser";
import { post_request } from "../../helpers/Request";
import swal from "sweetalert";

export function clearState() {
  this.setState({
    name: "",
    lastname1: "",
    lastname2: "",
    email: "",
  });
}

export function createUserObject() {
  return {
    name: this.state.name,
    lastname1: this.state.lastname1,
    lastname2: this.state.lastname2,
    email: this.state.email,
  };
}

async function emailExistRequest(user) {
  const email = { email: user.email }
  const res = await post_request(`user/email/exists`, email);
  return {
    status: res.status,
    data: res.data,
  };
}

export async function createUser() {
  const user = this.createUserObject();
  const validFormat = validateUser(user);
  const request = await emailExistRequest(user);
  if (validFormat && request.status) {
    const user_email_exists = request.data.useremailexists;
    if (!user_email_exists) {
      swal({
        title: "¡Atención!",
        text: `Por favor verifique que el correo esté escrito correctamente, debido a que la contraseña
            de este usuario será enviada a dicho correo.

            El correo es: ${user.email} 

            ¿Desea registrar al usuario?`,
        icon: "info",
        buttons: ["Cancelar", "Aceptar"],
      }).then(async (willConfirm) => {
        if (willConfirm) {
          const res = await post_request(`user`, user);
          if (res.status) {
            swal("¡Listo!", "Usuario registrado exitosamente.", "success");
            this.clearState();
          }
        }
      });
    } else {
      swal(
        "¡Atención!",
        "El correo ingresado ya tiene una cuenta asociada.",
        "warning"
      );
    }
  }
}
