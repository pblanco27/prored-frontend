import React, { Component } from 'react'
import SelectAuto from '../SelectAuto/SelectAuto'
import Vinculacion from '../Vinculacion/Vinculacion'
import axios from 'axios'
import swal from 'sweetalert';

export default class BusquedaNombre extends Component {
    constructor(props) {
        super(props);
        this.state = {
            persons: [],
            botonEstado: 'btn btn-danger',
            botonValor: 'Desactivar',
            mostrarBotones: false,
            estadoEstudiante: null,
            selectedStudent: null,
            infoStudent: null,
            disabled: 'disabled',
            showSubmitButton: false,
            vinculacionKey: 0
        }
    }

    getPersons = async () => {
        const res = await axios.get(`/student_all`);
        const personData = res.data;
        personData.map(person => this.state.persons.push(
            {
                title: person.name + " " + person.lastname1 + " " + person.lastname2,
                id: person.dni,
                state: person.status
            }
        ))
    }

    onChangeSelectedStudent = async (event, values) => {
        event.preventDefault();
        if (values !== null) {
            await this.setState({ selectedStudent: values.id, estadoEstudiante: values.state });
            const res = await axios.get(`/student/` + this.state.selectedStudent + `/status`);
            this.setState({ estadoEstudiante: res.data.status });
            this.setEstadoBoton();
            this.setState({ mostrarBotones: true });
        } else {
            this.setState({ mostrarBotones: false, infoStudent: null });
        }
    }

    setEstadoBoton = async () => {
        if (this.state.estadoEstudiante) {
            this.setState({
                botonEstado: 'btn btn-danger',
                botonValor: 'Desactivar',
            })
        } else {
            this.setState({
                botonEstado: 'btn btn-success',
                botonValor: 'Activar',
            })
        }
    }

    onChangeDesactivacion = async () => {
        this.desactivarVinculado();
        this.setEstadoBoton();
    }

    desactivarVinculado = async () => {
        if (this.state.estadoEstudiante) {
            const res = await axios.put(`/student/` + this.state.selectedStudent + "/disable");
            this.setState({ estadoEstudiante: false })
            if (res.status === 200) {
                swal("¡Listo!", "Se desabilitó  vinculado exitosamente.", "success");
            }
            else {
                swal("¡Error!", "No se pudo desabilitar el vinculado", "error");
            }
        } else {
            const res = await axios.put(`/student/` + this.state.selectedStudent + "/enable");
            this.setState({ estadoEstudiante: true })
            if (res.status === 200) {
                swal("¡Listo!", "Se habilitó el vinculado exitosamente.", "success");
            }
            else {
                swal("¡Error!", "No se pudo habilitar el vinculado", "error");
            }
        }
        this.setEstadoBoton();
    }

    onClickSearchStudent = async () => {        
        if (this.state.selectedStudent !== null) {
            const res = await axios.get(`/student_all/` + this.state.selectedStudent);
            this.setState({ infoStudent: res.data,
                            vinculacionKey: this.state.vinculacionKey + 1,
                            disabled: "disabled"});
        }        
    }

    componentDidMount() {
        this.getPersons();
    }

    onClickEditButton = () => {
        this.setState({ showSubmitButton: true, disabled: "" });
    }

    renderVinculacion() {
        if (this.state.infoStudent !== null) {
            return <Vinculacion
                key={this.state.vinculacionKey}
                ref={this.vinculacionRef}
                parent="ver"
                disabled={this.state.disabled}
                showSubmitButton={this.state.showSubmitButton}
                personData={this.state.infoStudent}
            />;
        }
    }

    render() {
        return (
            <div>
                <div id="container">
                    <header><h4>Buscar vinculado</h4></header>
                    <center>A continuación puede buscar una persona por su nombre o número de cédula</center><br></br>
                    <div id="part-1">
                        <div className="row">
                            <div className="col-md-3"></div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <SelectAuto list={this.state.persons} label="Vinculados" onChange={this.onChangeSelectedStudent} />
                                </div> <br></br>
                                {this.state.mostrarBotones ?
                                    <center><input type="button" className="btn btn-success" onClick={this.onClickSearchStudent} value="Buscar"></input></center>
                                    : null}
                            </div>
                            {this.state.mostrarBotones ?
                                <div className="col-md-3">
                                    <input type="button" className={this.state.botonEstado} value={this.state.botonValor} onClick={this.onChangeDesactivacion} ></input>
                                    <br></br><br></br>
                                    <input type="button" className="btn btn-primary" value="Editar" onClick={this.onClickEditButton}></input>
                                </div>
                                : null}
                        </div>
                        <br></br>
                    </div>
                </div>
                {this.renderVinculacion()}
            </div>
        )
    }
}