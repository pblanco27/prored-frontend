import logoProred from './photos/prored.png'
import logoUned from './photos/unedlogo.png'
import logoVicerectoria from './photos/vice.jpeg'



  export function generateFooter  (doc) {
        doc.addImage(logoVicerectoria, 'JPEG', 100, 750, 50, 50)
        doc.addImage(logoProred, 'JPEG', 280, 750, 50, 50)
        doc.addImage(logoUned, 'JPEG', 450, 750, 50, 50)
        doc.setDrawColor(4, 24, 138) // draw red lines
        doc.line(100,810, 500,810)
        return doc;
    } 

  export function  writeText (text, textWidth, doc, fontSize, fontType, lineSpacing , xPosition , initialYPosition , pageWrapInitialYPosition ) {
        doc.setFontType(fontType);
        doc.setFontSize(fontSize);
        var textLines = doc.splitTextToSize(text, textWidth);
        var pageHeight = doc.internal.pageSize.height - 100;       
        var cursorY = initialYPosition;
      
        textLines.forEach(lineText => {
          if (cursorY > pageHeight) {
            doc  = createSeparator(doc)
            cursorY = pageWrapInitialYPosition;
          }
          doc.text(xPosition, cursorY, lineText);
          cursorY += lineSpacing;
        })
        return doc; 
      }


    export function  createSeparator(doc) {
        doc = generateFooter(doc);
        doc.addPage()
        return doc;
     }
 
     export function generateHeader (doc, state) {
       doc.setFont('helvetica')
       doc.setFontType('bold')
       doc.text(215, 40, 'UNIVERSIDAD ESTATAL A DISTANCIA ')
       doc.setFontSize(12)
       doc.setFontType('italic')
       doc.text(105, 60, 'Programa de Investigación para la Promoción del Trabajo en Red – ProRed')
       doc.text(342, 80, 'Contactos: prored@uned.ac.cr'  )  
       doc.setLineWidth(0.5)
       doc.setDrawColor(4, 24, 138) // draw red lines
       doc.line(100,100, 500,100)
       doc.setFontType('bold')
       doc.setFontSize(10)
       doc.text(420, 120, "Fecha: " +  state.date.toString() +  " / "  +  state.month.toString() + " / " + state.year.toString() ) 
       return doc;
     }   
  