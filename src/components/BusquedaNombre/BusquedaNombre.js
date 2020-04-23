import React, { Component } from "react";
import SelectAuto from "../SelectAuto/SelectAuto";
import Vinculacion from "../Vinculacion/Vinculacion";
import axios from "axios";
import swal from "sweetalert";
import { Link } from "react-router-dom";

/*
    Componente para visualización y edición de la info de los vinculados
*/

export default class BusquedaNombre extends Component {
  constructor(props) {
    super(props);
    this.state = {
      persons: [],
      botonEstado: "btn btn-danger",
      botonValor: "Desactivar",
      botonEdicionValor: "Editar",
      mostrarBotones: false,
      estadoEstudiante: null,
      selectedStudent: null,
      infoStudent: null,
      disabled: "disabled",
      showSubmitButton: false,
      vinculacionKey: 0,
      buttonDisabled: "disabled",
      buttonEdicionDIsabled: "disabled",
      edicionKey: true,
      botonEstadoEdicion: "btn btn-primary",
    };
  }

  //Función para obtener todas las personas de la base
  getPersons = async () => {
    const res = await axios.get(`/student_all`);
    const personData = res.data;
    personData.map((person) =>
      this.state.persons.push({
        title: person.name + " " + person.lastname1 + " " + person.lastname2,
        id: person.dni,
        state: person.status,
      })
    );
  };

  //Función para obtener un estudiante seleccionado
  /*
        Cuando el select de la persona cambia, se reasignará la información básica del estudiante
        seleccionado
    */
  onChangeSelectedStudent = async (event, values) => {
    event.preventDefault();
    await this.setState({ infoStudent: null });
    if (values !== null) {
      await this.setState({
        selectedStudent: values.id,
        estadoEstudiante: values.state,
      });
      const res = await axios.get(
        `/student/` + this.state.selectedStudent + `/status`
      );
      await this.setState({ estadoEstudiante: res.data.status });
      this.setEstadoBoton();
      await this.setState({
        buttonDisabled: "",
        buttonEdicionDIsabled: "disabled",
        botonEdicionValor: "Editar",
        botonEstadoEdicion: "btn btn-primary",
      });
    } else {
      await this.setState({
        buttonDisabled: "disabled",
        buttonEdicionDIsabled: "disabled",
      });
    }
  };

  //Función para obtener un estudiante seleccionado
  /*
        Cuando el select de la persona cambia, se reasignará la información básica del estudiante
        seleccionado
    */
  onChangeDesactivacion = async () => {
    swal({
      title: "¡Atención!",
      text: "Una vez ejecutado cambiará su estado en todo el sistema",
      icon: "warning",
      buttons: ["Cancelar", "Aceptar"],
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        this.desactivarVinculado();
        this.setEstadoBoton();
      } else {
        swal("El estado se mantendrá igual", {
          title: "¡Atención!",
          icon: "warning",
        });
      }
    });
  };

  //Función para cambiar el estado del estudiante seleccionado
  /*
        Cuando se hace trigger del botón se procede a cambiar de estado al estudiante
    */
  desactivarVinculado = async () => {
    if (this.state.estadoEstudiante) {
      const res = await axios.put(
        `/student/` + this.state.selectedStudent + "/disable"
      );
      this.setState({ estadoEstudiante: false });
      if (res.status === 200) {
        swal("¡Listo!", "Se desabilitó  vinculado exitosamente.", "success");
      } else {
        swal("¡Error!", "No se pudo desabilitar el vinculado", "error");
      }
    } else {
      const res = await axios.put(
        `/student/` + this.state.selectedStudent + "/enable"
      );
      this.setState({ estadoEstudiante: true });
      if (res.status === 200) {
        swal("¡Listo!", "Se habilitó el vinculado exitosamente.", "success");
      } else {
        swal("¡Error!", "No se pudo habilitar el vinculado", "error");
      }
    }
    this.setEstadoBoton();
  };

  //Función para obtener la información de un estudiante seleccionado }
  // cuando se busca
  /*
        Cuando el boton de buscar se clickea se busca en la base la información del 
        estudiante seleecionado 
    */
  onClickSearchStudent = async () => {
    if (this.state.selectedStudent !== null) {
      const res = await axios.get(`/student_all/` + this.state.selectedStudent);
      await this.setState({
        infoStudent: res.data,
        vinculacionKey: this.state.vinculacionKey + 1,
        disabled: "disabled",
        buttonEdicionDIsabled: "",
        edicionKey: true,
        botonEdicionValor: "Editar",
        botonEstadoEdicion: "btn btn-primary",
      });
    } else {
      //indicar que debe seleecionar uno de la lista
      swal(
        "¡Atención!",
        "Debe seleccionar un vinculado de la lista para buscar",
        "warning"
      );
    }
    this.setState({ showSubmitButton: false });
  };

  //Función para editar la información de un estudiante seleccionado
  /*
        Cuando el boton de editar se clickea se permite la edición de los 
        datos además del cambio de estado del boton  
    */
  onClickEditButton = async () => {
    if (this.state.edicionKey) {
      this.setState({
        showSubmitButton: true,
        disabled: "",
        edicionKey: false,
        botonEstadoEdicion: "btn btn-danger",
        botonEdicionValor: "Cancelar",
      });
    } else {
      swal({
        title: "¡Atención!",
        text: "Una vez ejecutado se eliminarán los cambios hechos",
        icon: "warning",
        buttons: ["Cancelar", "Aceptar"],
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          this.setState({
            edicionKey: true,
            botonEstadoEdicion: "btn btn-primary",
            botonEdicionValor: "Editar",
          });
          //Recargar el default
          this.onClickSearchStudent();
          swal("La información original ha sido restaurada", {
            title: "¡Listo!",
            icon: "success",
          });
        } else {
          swal("Los cambios siguen intactos, continue la edición", {
            title: "¡Atención!",
            icon: "info",
          });
        }
      });
    }
  };

  //Funcion para montar el componente
  componentDidMount() {
    this.getPersons();
  }

  //Render del componente de vinculación
  renderVinculacion() {
    if (this.state.infoStudent !== null) {
      return (
        <Vinculacion
          key={this.state.vinculacionKey}
          ref={this.vinculacionRef}
          parent="ver"
          disabled={this.state.disabled}
          showSubmitButton={this.state.showSubmitButton}
          personData={this.state.infoStudent}
        />
      );
    }
  }

  //Cambio del boton de desactivacion
  setEstadoBoton = async () => {
    if (this.state.estadoEstudiante) {
      this.setState({
        botonEstado: "btn btn-danger",
        botonValor: "Desactivar",
      });
    } else {
      this.setState({
        botonEstado: "btn btn-success",
        botonValor: "Activar",
      });
    }
  };

  render() {
    return (
      <div>
        <div className="my-container busqueda-nombre">
          <header>
            <h4>Buscar vinculado</h4>
          </header>
          <center>
            A continuación puede buscar una persona por su nombre o número de
            cédula
          </center>
          <br></br>
          <div id="part-1">
            <div className="row">
              <div className="col-md-1"></div>
              <div className="col-md-6">
                <div className="form-group">
                  <SelectAuto
                    list={this.state.persons}
                    label="Vinculados"
                    onChange={this.onChangeSelectedStudent}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="row">
                  <div className="col-md-4">
                    <input
                      type="button"
                      className="btn btn-success"
                      onClick={this.onClickSearchStudent}
                      value="Buscar"
                      disabled={this.state.buttonDisabled}
                    ></input>
                  </div>
                  <div className="col-md-4">
                    <input
                      type="button"
                      className={this.state.botonEstadoEdicion}
                      value={this.state.botonEdicionValor}
                      onClick={this.onClickEditButton}
                      disabled={this.state.buttonEdicionDIsabled}
                    ></input>
                  </div>
                  <div className="col-md-4">
                    <input
                      type="button"
                      className={this.state.botonEstado}
                      value={this.state.botonValor}
                      onClick={this.onChangeDesactivacion}
                      disabled={this.state.buttonEdicionDIsabled}
                    ></input>
                  </div>
                </div>
              </div>
              <div className="col-md-1"></div>
            </div>
            <br></br>
          </div>
        </div>
        {this.renderVinculacion()}
      </div>
    );
  }
}
