import React, { Component } from 'react'
import './Footer.css'

/*
    Clase para footer despliega el footer oficial de 
    la UNED   
*/
export default class Footer extends Component {
    render() {
        return (
            <div>
                <div>
                    <img id="cintilloProred" src="https://investiga.uned.ac.cr/prored/wp-content/uploads/sites/24/2017/03/cropped-Cintillo_ProRed2.png" alt="ProRed" />
                </div>
                <div id="footer-sub">
                    <footer id="footer">
                        <div id="footer">
                            Tel: (506) 2527-2000&nbsp;/&nbsp;<a href="https://www.uned.ac.cr/contacto">Contacto</a>&nbsp;/&nbsp;<a href="https://www.uned.ac.cr/index.php/aviso-legal">Aviso legal</a>&nbsp;/&nbsp;<a href="https://www.uned.ac.cr/dtic">DTIC</a>
                            <div id="iconos">
                                <a href="https://www.uned.ac.cr/index.php/guia-telefonica" title="Directorio Telefónico"><img src="https://www.uned.ac.cr/imagenes/directorio.png" width="35" height="35" alt="Directorio telefónico" /></a>
                                <a href="https://www.uned.ac.cr/index.php/mapa-del-sitio" title="Mapa del sitio"><img src="https://www.uned.ac.cr/imagenes/mapasitio.png" width="35" height="35" alt="Mapa del sitio" /></a>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        )
    }
}