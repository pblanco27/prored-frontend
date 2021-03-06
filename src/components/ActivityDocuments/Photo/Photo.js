import React, { Component } from "react";
import CreatePhoto from "../../Modal/CreatePhoto";
import { API } from "../../../services/env";
import swal from "sweetalert";
import { get_request, delete_request } from "../../../helpers/Request";

export default class Photo extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      photoList: [],
    };
    this.getPhotos = this.getPhotos.bind(this);
    this.handleDeletePhoto = this.handleDeletePhoto.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;

    this.getPhotos();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  async getPhotos() {
    const res = await get_request(`photo/activity/${this.props.id_activity}`);
    if (res.status && this._isMounted) {
      const photoList = res.data;
      this.setState({
        photoList,
      });
    }
  }

  handleDeletePhoto(event) {
    const value = event.target.value;
    swal({
      title: "¡Atención!",
      text: "Una vez ejecutado se va a borrar la Foto del sistema.",
      icon: "info",
      buttons: ["Cancelar", "Aceptar"],
    }).then(async (willConfirm) => {
      if (willConfirm) {
        const res = await delete_request(`photo/${value}`);
        if (res.status) {
          swal("Se eliminó la Foto exitosamente", {
            title: "¡Atención!",
            icon: "info",
          });
          this.getPhotos();
        }
      } else {
        swal("La información se mantendrá igual", {
          title: "¡Atención!",
          icon: "info",
        });
      }
    });
  }

  render() {
    const photos = this.state.photoList.map((p) => {
      return (
        <div className="card mb-3" key={p.id_photo}>
          <div className="card-body">
            <div className="card-title">Fecha: {p.date_taken}</div>
            {p.comment !== "" && (
              <p className="card-text">
                <b>Comentario: </b>
                {p.comment}
              </p>
            )}
            <div className="btn-container">
              <a
                className="btn btn-info"
                href={`${API}/${p.file_path}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver Foto
              </a>
              <button
                className="btn btn-danger"
                onClick={this.handleDeletePhoto}
                value={p.id_photo}
              >
                Eliminar Fotos
              </button>
            </div>
          </div>
        </div>
      );
    });
    return (
      <>
        <div className="d-flex justify-content-center">
          <CreatePhoto
            id_activity={this.props.id_activity}
            updateSelect={this.getPhotos}
          />
        </div>
        <hr />

        <div className="w-75 mx-auto">
          <div className="w-100">{photos}</div>
        </div>
      </>
    );
  }
}
