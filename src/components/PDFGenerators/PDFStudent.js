import React from 'react';
import jsPDF from 'jspdf';
import {generateFooter, writeText, generateHeader, createSeparator } from "./UtilitiesPDF"
import { get_request } from "../../helpers/Request";




class PDFStudent extends React.Component {
   
    constructor(props) {
        super(props)
        this.state ={
          year : "", 
          month : "",
          date : "",
          isResident :  true,  // se saca del props
          projectList : ""
        }  
    };

    async getAsociatedProjects (){
      const res = await get_request(
        `projectstudents/${this.props.info.dni}`
      );
      let projects = ""
      for (let i = 0 ; i< res.data.length; i++ ){
        projects += projects + res.data[i].name;
        if ( res.data.length>1)projects += projects + ", ";
      }
      return projects
    }

    generateAcademicInfoStudent = (doc, ypos) => {
      console.log(this.props.info)
      doc = writeText( "Información académica de estudiante: ", 500, doc,'15','bold', 15, 100, ypos, 70  );
      ypos += 20 
      doc = writeText( "Centro Universitario:", 500, doc,'12','bold', 15, 70, ypos, 70  );
      doc = writeText( this.props.info.campus , 500, doc,'12','normal', 15, 210, ypos, 70  );
      ypos += 20 
      doc = writeText( "Carrera(s) que cursa:" , 500, doc,'12','bold', 15, 70, ypos, 70  );
      ypos += 20 
      for (let i = 0 ; i< this.props.info.careers_selected.length; i++ ){
        doc = writeText(this.props.info.careers_selected[i].label  , 500, doc,'12','normal', 15, 100, ypos, 70  );
        ypos += 20
      }
      ypos += 20 
      doc = writeText( "Información académica adicional: ", 500, doc,'15','bold', 15, 100, ypos, 70  );
      ypos += 20 
      doc = writeText( "Curso(s) que lleva:", 500, doc,'12','bold', 15, 70, ypos, 70  );
      ypos += 20 
      for (let i = 0 ; i< this.props.info.associatedCareers_selected.length; i++ ){
        doc = writeText(this.props.info.associatedCareers_selected[i].label  , 500, doc,'12','normal', 15, 100, ypos, 70  );
        ypos += 20
      }
      ypos += 20 
      doc = writeText( "Red(es) asociada(s):", 500, doc,'12','bold', 15, 70, ypos, 70  );
      ypos += 20 
      for (let i = 0 ; i< this.props.info.networks_selected.length; i++ ){
        doc = writeText(this.props.info.networks_selected[i].label  , 500, doc,'12','normal', 15, 100, ypos, 70  );
        ypos += 20
      }
      ypos += 20 
      doc = writeText( "Idioma(s):", 500, doc,'12','bold', 15, 70, ypos, 70  );
      ypos += 20 
      for (let i = 0 ; i< this.props.info.languages_selected.length; i++ ){
        doc = writeText(this.props.info.languages_selected[i].label  , 500, doc,'12','normal', 15, 100, ypos, 70  );
        ypos += 20
      }
      ypos += 40 
      if (ypos >= 740) ypos =  150;  
      return [doc ,  ypos]
    }





    generateBaseInfoStudent = (doc, ypos) => {
      doc = writeText( "Información de estudiante: ", 500, doc,'15','bold', 15, 100, ypos, 70  );
      ypos += 20 
      if (ypos >= 740) ypos =  150; 
      doc = writeText( "Perfil del estudiante:", 500, doc,'12','bold', 15, 70, ypos, 70  );
      doc = writeText( this.props.info.profile , 500, doc,'12','normal', 15, 190, ypos, 70  );
      ypos += 20 
      doc = writeText( "Nombre:" , 500, doc,'12','bold', 15, 70, ypos, 70  );
      doc = writeText( this.props.info.name , 500, doc,'12','normal', 15, 120, ypos, 70  );
      ypos += 20 
      doc = writeText( "Primer Apellido:", 500, doc,'12','bold', 15, 70, ypos, 70  );
      doc = writeText( this.props.info.lastname1, 500, doc,'12','normal', 15, 165, ypos, 70  );
      ypos += 20 
      doc = writeText( "Segundo Apellido:", 500, doc,'12','bold', 15, 70, ypos, 70  );
      doc = writeText( this.props.info.lastname2 , 500, doc,'12','normal', 15, 180, ypos, 70  );
      ypos += 20 
      doc = writeText( "Cédula de identificación:", 500, doc,'12','bold', 15, 70, ypos, 70  );
      doc = writeText( this.props.info.dni, 500, doc,'12','normal', 15, 215, ypos, 70  );
      ypos += 20 
      doc = writeText( "Estado cívil:", 500, doc,'12','bold', 15, 70, ypos, 70  );
      doc = writeText( this.props.info.marital_status, 500, doc,'12','normal', 15, 145, ypos, 70  );
      ypos += 20 
      doc = writeText( "Fecha nacimiento:", 500, doc,'12','bold', 15, 70, ypos, 70  );
      doc = writeText( this.props.info.born_dates, 500, doc,'12','normal', 15, 185, ypos, 70  );
      ypos += 20 
      doc = writeText( "País de nacimiento:", 500, doc,'12','bold', 15, 70, ypos, 70  );
      let pais = this.props.info.country_selected.label; 
      doc = writeText(pais.substring(5,pais.length), 500, doc,'12','normal', 15, 185, ypos, 70  );
      ypos += 40 
      if (ypos >= 740) ypos =  150;  
      return [doc ,  ypos]
    }


    generateBasicContactInfo = (doc, ypos) => {
      doc = writeText( "Información de contacto: ", 500, doc,'15','bold', 15, 100, ypos, 70  );
      ypos += 20 
      doc = writeText( "Email:", 500, doc,'12','bold', 15, 70, ypos, 70  );
      doc = writeText( this.props.info.email, 500, doc,'12','normal', 15, 110, ypos, 70  );
      ypos += 20 
      doc = writeText( "Número telefónico:", 500, doc,'12','bold', 15, 70, ypos, 70  );
      doc = writeText( this.props.info.phone_number, 500, doc,'12','normal', 15, 182, ypos, 70  );
      ypos += 20 
      doc = writeText( "Número de emergencia:", 500, doc,'12','bold', 15, 70, ypos, 70  );
      doc = writeText( this.props.info.emergency_contact, 500, doc,'12','normal', 15, 210, ypos, 70  );
      if (ypos >= 740) ypos =  150;  
      return [doc ,  ypos]
    }

    generateLocationInfo = (doc, ypos) => {
      console.log(this.props.info.direction)
      ypos += 40
      doc = writeText( "Localización: ", 500, doc,'15','bold', 15, 100, ypos, 70  );
      if(this.state.isResident){
        ypos += 20
        doc = writeText( "Provincia:", 500, doc,'12','bold', 15, 70, ypos, 70  );
        doc = writeText( this.props.info.direction.name, 500, doc,'12','normal', 15, 130, ypos, 70  );
        ypos += 20
        doc = writeText( "Cantón:", 500, doc,'12','bold', 15, 70, ypos, 70  );
        doc = writeText( this.props.info.direction.canton_name , 500, doc,'12','normal', 15, 120, ypos, 70  );
        ypos += 20
        doc = writeText( "Distrito:", 500, doc,'12','bold', 15, 70, ypos, 70  );
        doc = writeText( this.props.info.direction.district_name, 500, doc,'12','normal', 15, 120, ypos, 70  );
      }
      ypos += 20
      doc = writeText( "Dirección:  ", 500, doc,'12','bold', 15, 70, ypos, 70  );
      doc = writeText( this.props.info.address, 500, doc,'12','normal', 15, 130, ypos, 70  );
      ypos += 40
      if (ypos >= 740) ypos =  150;  
      return [doc ,  ypos]
    }


    generateProjecInfo = (doc, ypos) => {
      doc = writeText( "Proyectos asociados: ", 500, doc,'15','bold', 15, 100, ypos, 70  );
      ypos += 20
      if (ypos >= 740) ypos =  150;  

      doc = writeText(    this.state.projectList  , 500, doc,'12','normal', 15, 100, ypos, 70  );
      ypos += 20
      
      return [doc ,  ypos]
    }

    
    generateInfoStudent = (doc) =>{
      let ypos = 150;
      [doc , ypos] =  this.generateBaseInfoStudent(doc,  ypos);
      [doc , ypos] =  this.generateBasicContactInfo(doc,  ypos);
      [doc , ypos] =  this.generateLocationInfo(doc,  ypos);
      [doc , ypos] = this.generateProjecInfo(doc,  ypos);
      doc  = createSeparator(doc);
      ypos = 100;
    [doc , ypos] = this.generateAcademicInfoStudent(doc,  ypos);
      return doc;  
    }

    generatePDF = () => {
      var doc = new jsPDF('p', 'pt');
      doc  =generateHeader(doc, this.state);
      doc = this.generateInfoStudent(doc);
      doc  =generateFooter(doc);
      doc.save('PDFEstudiante.pdf') // concatenarlo con el nombre del estudiante
    }  
    
    async componentDidMount(){
      let newDate = new Date()
      let dateNew = newDate.getDate();
      let monthNew = newDate.getMonth() + 1;
      let yearNew = newDate.getFullYear();
      let listaProjects = await this.getAsociatedProjects(); 
      this.setState({
          year : yearNew,
          month : monthNew, 
          date : dateNew ,
          projectList : listaProjects
      })
    }
    
    render() {
        return (
            <div className="mx-auto" >
                <button onClick={this.generatePDF} type="submit"
              className="btn btn-lg btn-info">Descargar PDF de Estudiante</button> 
            </div>
        );
    }
}

export default PDFStudent;