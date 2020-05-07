import React, { Component } from "react";
import "./NavbarUned.css";

/**
 * * Componente que contiene y muestra el navbar oficial de la UNED,
 */
export default class NavbarUned extends Component {
  render() {
    return (
      <div id="menuInstCont">
        <div id="menuInst">
          <div className="logouned">
            <a
              href="https://www.uned.ac.cr/"
              title="UNED: Institución Benemérita de la Educación y la Cultura"
            >
              <img
                src="https://www.uned.ac.cr/menu/img/uned.png"
                border="0px"
                width="70"
                height="70"
                alt="UNED: Institución Benemérita de la Educación y la Cultura"
                title="UNED: Institución Benemérita de la Educación y la Cultura"
              />
            </a>
          </div>
          <div className="pvw-uned">
            <a
              href="https://www.uned.ac.cr/"
              className="uned"
              title="UNED: Institución Benemérita de la Educación y la Cultura"
            >
              <span>UNIVERSIDAD ESTATAL A DISTANCIA</span>
            </a>
          </div>
          <div className="pvw-uned-small">
            <a
              href="https://www.uned.ac.cr/"
              className="uned-small"
              title="UNED: Institución Benemérita de la Educación y la Cultura"
            >
              <span>UNED</span>
            </a>
          </div>
          <div id="costarica">Costa Rica</div>
        </div>
      </div>
    );
  }
}