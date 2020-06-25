import { validateUser } from "../../helpers/ValidateUser";
import swal from "sweetalert";
import { API } from "../../services/env";
import axios from "axios";

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

export async function createUser() {
  const user = this.createUserObject();
  if (validateUser(user)) {
    const res = await axios.post(`${API}/user/email/exists`, {
      email: user.email,
    });
    const user_email_exists = res.data.useremailexists;
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
          const res = await axios.post(`${API}/user`, user);
          if (res.status === 200) {
            swal("¡Listo!", "Usuario registrado exitosamente.", "success");
          } else {
            swal(
              "¡Atención!",
              "Ha ocurrido un error al intentar registrar al usuario.",
              "warning"
            );
          }
          this.clearState();
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
