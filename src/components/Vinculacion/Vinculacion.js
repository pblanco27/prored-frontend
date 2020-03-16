import React, { Component } from 'react'
import PersonalData from '../PersonalData/PersonalData';
import PersonalDataPartial from '../PersonalData/PersonalDataPartial';
import AcademicInfo from '../AcademicInfo/AcademicInfo';
import AcademicUnit from '../AcademicUnit/AcademicUnit';

export default class Vinculacion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: "disabled",
            showMyComponent : '0'
        }

    }

    componentDidMount(){
        if (this.props.type === "professor"){
            const disabled = "disabled"
            this.setState({disabled})                       
        } 
    }

    getDisabled = () =>{
        const res  =  this.state.disabled ;  
        return res;   
    }


    onChange = (event) =>{ 
        var opcion =  event.target.value;
        var res = "";
        if (opcion == '2'){
            res = "disabled";
            this.setState ({showMyComponent : '2'});
        }
        else{  this.setState ({showMyComponent : '1'});  }

        this.setState({ disabled: res})
        
    }


    onChangeVinculacion = (event) =>{ 
        var opcion =  event.target.value;
        if (this.state.showMyComponent  != '2'){ 
            switch(opcion) {
                case '1':
                    this.setState({showMyComponent : '11'});
                    break;
                case '2':
                    this.setState({showMyComponent : '12'});
                    break;
                case '3':
                    this.setState({showMyComponent : '13'});
                    break;
                case '4':
                    this.setState({showMyComponent : '14'});
                    break;
                default:
                    this.setState({showMyComponent : this.state.showMyComponent});
                    break;
            }
        }
        
    }

    renderSwitch () {
        switch(this.state.showMyComponent) {
            case '11':
                return   <div> <PersonalDataPartial />   <AcademicInfo/>  </div> ;
            case '12':
                return  <div> <PersonalDataPartial />   <AcademicInfo/>  </div>;
            case '13':
                return <div> <PersonalData />   <AcademicInfo/>  </div>;
            case '14':
                return <div> <PersonalData/>   <AcademicInfo/>  </div>;
            case '2':
                return <div> <PersonalDataPartial />   <AcademicUnit/>  </div>;
            default:
                return <div> </div> ;
        }
    }




    render() {
        return (        
            <div>     
                <div id="container">
                    <header><h4>Sección de vinculación</h4></header>
                    <div id="part-1">
                        <br></br>
                        <div class="row">
                            <div class="col-md-1"></div>
                            <div class="col-md-5">
                                <div class="form-group">
                                    <label for="tipoVinculado">Tipo de vinculado: </label>
                                    <select class="form-control" onChange = {this.onChange} >
                                        <option class="select-cs" value="" selected="selected">Seleccione el tipo de vinculado</option>
                                        <option value="1">Estudiante</option>
                                        <option value="2">Profesor</option>
                                        {/* <option value="3">Investigador</option>
                                        <option value="4">Asistente</option> */}
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-5">
                                    
                                <div class="form-group">
                                    <label for="tipoVinculacion">Tipo de vinculación:   </label><br></br>
                                    <h1>{this.state.showMyComponent}</h1>
                                    <select class="form-control" disabled = {this.getDisabled()}   onChange = {this.onChangeVinculacion}>                                      
                                        <option class="select-cs" value="" selected="selected" >Seleccione el tipo de vinculación</option>
                                        <option value="1">Invitado</option>
                                        <option value="2">Básico</option>
                                        <option value="3">Medio</option>
                                        <option value="4">Avanzado</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-1"></div>
                        </div>
                        <br></br>
                    </div>
                </div>
                {this.renderSwitch()}


            </div>
        )
    }
}

