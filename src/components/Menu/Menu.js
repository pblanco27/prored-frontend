import React, { Component } from 'react'
import './Menu.css'
import '../Navbar/Navbar.css'

export default class Menu extends Component {
    render() {
        return (   
            <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
  <a class="navbar-brand" href="#">Mega Dropdown</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item">
        <a class="nav-link" href="#">Category</a>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Category 1
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">

          
          <div class="container">
            <div class="row">
              <div class="col-md-4">
                <span class="text-uppercase text-white">Category 1</span>
                <ul class="nav flex-column">
                <li class="nav-item">
                  <a class="nav-link active" href="#">Active</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Link item</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Link item</a>
                </li>
              </ul>
              </div>
       
              <div class="col-md-4">
                <ul class="nav flex-column">
                <li class="nav-item">
                  <a class="nav-link active" href="#">Active</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Link item</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Link item</a>
                </li>
              </ul>
              </div>
            </div>
          </div>
      


        </div>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Category 2
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">


          <div class="container">
            <div class="row">
              <div class="col-md-4">
                <span class="text-uppercase text-white">Category 2</span>
                <ul class="nav flex-column">
                <li class="nav-item">
                  <a class="nav-link active" href="#">Active</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Link item</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Link item</a>
                </li>
              </ul>
              </div>
        
              <div class="col-md-4">
                <ul class="nav flex-column">
                <li class="nav-item">
                  <a class="nav-link active" href="#">Active</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Link item</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Link item</a>
                </li>
              </ul>
              </div>
           
         
            </div>
          </div>
   


        </div>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Category 3
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">


          <div class="container">
            <div class="row">
              <div class="col-md-4">
               <span class="text-uppercase text-white">Category 3</span>
                <ul class="nav flex-column">
                <li class="nav-item">
                  <a class="nav-link active" href="#">Active</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Link item</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Link item</a>
                </li>
              </ul>
              </div>
       
              <div class="col-md-4">
                <ul class="nav flex-column">
                <li class="nav-item">
                  <a class="nav-link active" href="#">Active</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Link item</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Link item</a>
                </li>
              </ul>
              </div>
      
            </div>
          </div>
 


        </div>
      </li>

    </ul>

  </div>


</nav> 
   
        )
    }
}





