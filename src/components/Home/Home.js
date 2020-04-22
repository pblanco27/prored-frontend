import React, { Component } from 'react';
import uned from './uned.jpg';

/* Página inicial del sistema */

export default class Home extends Component {
    render() {
        return (
            <div>              
                <div id="container">
                    <header><h4>¡Bienvenido!</h4></header>
                    <div id="part-1">
                        <br></br>
                        <div className="row">
                            <div className="col-md-1"></div>
                            <div className="col-md-5">
                                <h5><b>ProRed</b></h5>
                                <p>
                                    El Programa de Investigación para la Promoción del Trabajo en Red (ProRed) es una unidad
                                    de la Vicerrectoría de Investigación de la Universidad Estatal a Distancia de Costa Rica (UNED).
                                    Su principal objetivo es generar espacios de trabajo colaborativo, a fin de incentivar las
                                    labores en red en materia de investigación y motivar a los estudiantes de la UNED a generar nuevos conocimientos.
                                    </p>
                                <h5><b>Acerca del sistema</b></h5>
                                <p>
                                    El presente sistema permite realizar acciones administrativas y de gestión acerca de la
                                    información de las personas y proyectos inscritos o vinculados al programa de ProRed.
                                </p>
                            </div>
                            <div className="col-md-5">
                                <img id="foto_uned" width="100%" src={uned} alt="" />
                            </div>
                            <div className="col-md-1"></div>
                        </div>
                        <br></br>
                    </div>
                </div>
            </div>
        )
    }
}    