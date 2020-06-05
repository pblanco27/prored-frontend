import React, { Fragment } from "react";
import { Switch, Route } from "react-router-dom";
import NavbarUned from "./components/NavbarUned/NavbarUned";
import Menu from "./components/Menu/Menu";
import Home from "./components/Home/Home";
import ManageInfo from "./components/ManageInfo/ManageInfo";
import Footer from "./components/Footer/Footer";
import LinkedStudent from "./components/LinkedStudent/LinkedStudent";
import SearchStudent from "./components/SearchStudent/SearchStudent";
import Project from "./components/Project/Project";
import SearchProject from "./components/SearchProject/SearchProject";
import GanttManager from "./components/GanttManager/GanttManager";
import ScrollTop from "./components/ScrollTop/ScrollTop";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Researcher from "./components/Researcher/Researcher";
import SearchResearcher from "./components/SearchResearcher/SearchResearcher";

const listaEjemplo  =[
  [
      1,
      'Spridddng 2014',
      'spring',
      '2014-02-22',
      '2014-03-10',
    ],
    [
      2,
      'Summer 2014',
      'summer',
      '2014-02-22',
      '2014-03-10',
    ],
    [
      3,
      'Autumn 2014',
      'autumn',
      '2014-02-22',
      '2014-03-10',
    ],
    [
      4,
      'Winter 2014',
      'winter',
      '2014-02-22',
      '2014-03-10',
    ],
    [
      5,
      'Spring 2015',
      'spring',
      '2014-02-22',
      '2014-03-10',
    ],
]

function App(props) {
  return (
    <Fragment>
      <NavbarUned />
      <Menu />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route
          path={`/registrar-estudiante`}
          render={(routeProps) => {
            return <LinkedStudent {...routeProps} />;
          }}
        />
        <Route
          path={`/buscar-estudiante/:dni?`}
          render={(routeProps) => {
            return <SearchStudent {...routeProps} />;
          }}
        />

        <Route
          path={`/registrar-investigador`}
          render={(routeProps) => {
            return <Researcher {...routeProps} />;
          }}
        />
        <Route
          path={`/buscar-investigador/:dni?`}
          render={(routeProps) => {
            return <SearchResearcher {...routeProps} />;
          }}
        />

        <Route
          path={`/buscar-proyecto/:id_project?`}
          render={(routeProps) => {
            return <SearchProject {...routeProps} />;
          }}
        />
        <Route
          path={`/crear-proyecto`}
          render={(routeProps) => {
            return <Project {...routeProps} />;
          }}
        />
        <Route path={`/manejo-gantt`}>
          <GanttManager task_list={listaEjemplo}/>
          {/* <GanttManager /> */}
        </Route>

        <Route path="/gestion-informacion">
          <ManageInfo />
        </Route>
      </Switch>
      <Footer />
      <ScrollTop {...props}>
        <Fab color="secondary" size="small" aria-label="Ir arriba">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </Fragment>
  );
}

export default App;
