import React, { Component } from 'react'
import SelectAuto from '../SelectAuto/SelectAuto'
import axios from 'axios'
import swal from 'sweetalert';


export default class BusquedaNombre extends Component {
    constructor(props) {
        super(props);
        this.state = {
            persons : [],
            botonEstado : 'btn btn-danger',
            botonValor  : 'Desactivar',
            mostrarBotones : false,
            estadoEstudiante : null,
            selectedStudent : null,
            infoStudent : null,
        }

    }

    getPersons = async () => {
        const res =  await axios.get(`/student_all`);
        const personData = res.data;
        console.log(personData);
        personData.map( person => this.state.persons.push(
            {   
                title: person.name + " " + person.lastname1 + " " + person.lastname2, 
                id: person.dni ,
                state : person.status
            }
        ))
    }

    onChangeSelectedStudent  = async (event, values) => {
        event.preventDefault();
        await this.setState ({ selectedStudent :   values.id , estadoEstudiante : values.state });
        const res =  await axios.get(`/student_all/`  +  this.state.selectedStudent);
        this.setState( {estadoEstudiante : res.data.student.status}) ;
        this.setEstadoBoton();
        this.setState ({mostrarBotones : true});     
    }

    setEstadoBoton = async ()  =>{
        if (this.state.estadoEstudiante){
            this.setState({
                botonEstado : 'btn btn-danger',
                botonValor  : 'Desactivar',
            })
        }else{
            this.setState({
                botonEstado : 'btn btn-success',
                botonValor  : 'Activar',
                
            })
        }
    }

    onChangeDesactivacion = async () =>{
        this.desactivarVinculado();
        this.setEstadoBoton();
    }

    desactivarVinculado = async () =>{
        if (this.state.estadoEstudiante){ 
            const res =  await axios.put(`/student/`  +  this.state.selectedStudent+ "/disable");
            this.setState({estadoEstudiante : false})
            if (res.status == 200) {
                swal("¡Listo!", "Se desabilitó  vinculado exitosamente.", "success");
            }
            else {
                swal("¡Error!", "No se pudo desabilitar el vinculado", "error");
            }
        }else{
            const res =  await axios.put(`/student/`  +  this.state.selectedStudent+ "/enable");  
            this.setState({estadoEstudiante : true})
            if (res.status == 200) {
                swal("¡Listo!", "Se habilitó el vinculado exitosamente.", "success");
            }
            else {
                swal("¡Error!", "No se pudo habilitar el vinculado", "error");
            }
        }
        this.setEstadoBoton();
    }


    onChangeSearchStudent = async () =>{
        if (this.state.selectedStudent != null){
            const res =  await axios.get(`/student_all/`  +  this.state.selectedStudent);
            this.setState({infoStudent : res.data});
         
        }
    }

    componentDidMount(){
        this.getPersons();
    }


    render() {
        return (
            <div id="container">
                <header><h4>Buscar vinculado</h4></header>
                <center>A continuación puede buscar una persona por su nombre o número de cédula</center><br></br>
                <div id="part-1">
                    <div className="row">
                        <div className="col-md-3"></div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <SelectAuto list={this.state.persons} label="Vinculados" onChange = {this.onChangeSelectedStudent}/>
                            </div> <br></br>
                            {this.state.mostrarBotones? 
                            <center><input type="button" className="btn btn-success"  onClick = {this.onChangeSearchStudent} value = "Buscar"></input></center>
                             :null}
                        </div>
                        {this.state.mostrarBotones? 
                        <div className="col-md-3">
                            <input type="button" className={this.state.botonEstado} value = {this.state.botonValor} onClick = {this.onChangeDesactivacion} ></input> 
                            <br></br><br></br>
                            <input type="button" className="btn btn-primary" value = "Editar"></input>
                        </div>
                        : null}
                    </div>
                    <br></br>

                   
                </div>
            </div>
        )
    }
}