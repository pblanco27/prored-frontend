import React from 'react';
import jsPDF from 'jspdf';
import {generateFooter, writeText, generateHeader } from "./UtilitiesPDF"
import { get_request } from "../../helpers/Request";


class PDFStudent extends React.Component {
   
    constructor(props) {
        super(props)
        this.state ={
          year : "", 
          month : "",
          date : "",
          infoList: []
       
        }
        //this.getUnitName = this.getUnitName.bind(this)

    };



    generateBaseInfo = (doc, ypos) => {
      doc = writeText( "Información general: ", 500, doc,'15','bold', 15, 100, ypos, 70  );
      ypos += 20 
      doc = writeText( "Nombre:" , 500, doc,'12','bold', 15, 70, ypos, 70  );
      doc = writeText( this.props.name, 500, doc,'12','normal', 15, 120, ypos, 70  );
      ypos += 20 
      doc = writeText( "Código de proyecto:", 500, doc,'12','bold', 15, 70, ypos, 70  );
      doc = writeText( this.props.code, 500, doc,'12','normal', 15, 190, ypos, 70  );
      ypos += 20 
      doc = writeText( "Tipo de proyecto:", 500, doc,'12','bold', 15, 70, ypos, 70  );
      doc = writeText("Dirigido por " + this.props.type, 500, doc,'12','normal', 15, 175, ypos, 70  );
      ypos += 40 
      if (ypos >= 740) ypos =  150;  
      return [doc ,  ypos]
    }

    generateAcademicInfo  (doc, ypos) {
      doc = writeText( "Información académica: ", 500, doc,'15','bold', 15, 100, ypos, 70  );
      ypos += 20 
      doc = writeText( "Unidad de investigación:", 500, doc,'12','bold', 15, 70, ypos, 70  );
      doc = writeText( this.state.infoList[0] , 500, doc,'12','normal', 15, 215, ypos, 70  );
      ypos += 20 
      doc = writeText( "Descripción de la Unidad:", 500, doc,'12','bold', 15, 70, ypos, 70  );
      doc = writeText( this.state.infoList[1], 500, doc,'12','normal', 15, 225, ypos, 70  );
      ypos += 50 
      doc = writeText( "Vinculados:", 500, doc,'12','bold', 15, 70, ypos, 70  );
      ypos += 20 
      for (let i = 0 ; i< this.props.linked_list.length; i++ ){
        doc = writeText("Nombre: " +  this.props.linked_list[i].fullName    +  "  Rol: " +  this.props.linked_list[i].rol   , 500, doc,'12','normal', 15, 100, ypos, 70  );
        ypos += 20

      }
      if (ypos >= 740) ypos =  150;  
      return [doc ,  ypos]
    }
  
    generateInfoProject = (doc) =>{
      let ypos = 150;
      [doc , ypos] =  this.generateBaseInfo(doc,  ypos);
      [doc , ypos] =  this.generateAcademicInfo(doc,  ypos);
      return doc;  
    }

    async getUnitName(invUnit){
      const res = await get_request(
        `investigation_unit/${invUnit}`
      );
      let lista = [res.data.name, res.data.description];
      return lista

    } 

    generatePDF = () => {
      var doc = new jsPDF('p', 'pt');
      doc  =generateHeader(doc, this.state);
      doc = this.generateInfoProject(doc);
      doc  =generateFooter(doc);
      doc.save('PDF'+this.props.name+ '.pdf') // concatenarlo con el nombre del estudiante
    }  
    
    async componentDidMount(){
      let newDate = new Date()
      let dateNew = newDate.getDate();
      let monthNew = newDate.getMonth() + 1;
      let yearNew = newDate.getFullYear(); 
      let unitlistloaded = [] ;
      unitlistloaded =  await this.getUnitName(this.props.unit.value);
      this.setState({
          year : yearNew,
          month : monthNew, 
          date : dateNew,
          infoList :  unitlistloaded
      })
      
    }
    
    render() {
        return (
            <div >
                <button onClick={this.generatePDF}  type="submit"
              className="btn btn-lg btn-info">Descargar PDF de Proyecto</button> 
            </div>
        );
    }
}

export default PDFStudent;