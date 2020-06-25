import React, { Fragment, Children, isValidElement, cloneElement } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import NavbarUned from "./components/NavbarUned/NavbarUned";
import Menu from "./components/Menu/Menu";
import Home from "./components/Home/Home";
import Filter from "./components/Filter/Filter";
import LinkedStudent from "./components/LinkedStudent/LinkedStudent";
import SearchStudent from "./components/SearchStudent/SearchStudent";
import Researcher from "./components/Researcher/Researcher";
import SearchResearcher from "./components/SearchResearcher/SearchResearcher";
import Project from "./components/Project/Project";
import SearchProject from "./components/SearchProject/SearchProject";
import ProjectDocument from "./components/ProjectDocument/ProjectDocument";
import LinkedGantt from "./components/LinkedGantt/LinkedGantt";
import Activity from "./components/Activity/Activity";
import SearchActivity from "./components/SearchActivity/SearchActivity";
import ActivityDocument from "./components/ActivityDocuments/ActivityDocuments";
import Signup from "./components/Signup/Signup";
import ChangePassword from "./components/ChangePassword/ChangePassword";
import Login from "./components/Login/Login";
import RecoverPassword from "./components/RecoverPassword/RecoverPassword";
import ManageInfo from "./components/ManageInfo/ManageInfo";
import Footer from "./components/Footer/Footer";
import ScrollTop from "./components/ScrollTop/ScrollTop";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={(routeProps) => {
        const childrenWithProps = Children.map(children, (child) => {
          if (isValidElement(child)) {
            return cloneElement(child, { ...routeProps });
          }
          return child;
        });
        return localStorage.getItem("token") ? (
          childrenWithProps
        ) : (
          <Redirect
            to={{
              pathname: "/iniciar-sesion",
            }}
          />
        );
      }}
    />
  );
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logged: false,
    };
    this.updateLogged = this.updateLogged.bind(this);
  }

  componentDidMount() {
    this.updateLogged();
  }

  updateLogged() {
    const logged = localStorage.getItem("token") ? true : false;
    this.setState({ logged });
  }

  render() {
    return (
      <Fragment>
        <NavbarUned />
        <Menu logged={this.state.logged} />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <PrivateRoute path={`/buscar`}>
            <Filter />
          </PrivateRoute>

          <PrivateRoute path={`/registrar-estudiante`}>
            <LinkedStudent key={1} />
          </PrivateRoute>

          <PrivateRoute path={`/ver-estudiante/:dni`}>
            <LinkedStudent key={2} />
          </PrivateRoute>

          <PrivateRoute path={`/buscar-estudiante/:dni?`}>
            <SearchStudent />
          </PrivateRoute>

          <PrivateRoute path={`/registrar-investigador`}>
            <Researcher key={3} />
          </PrivateRoute>

          <PrivateRoute path={`/ver-investigador/:dni`}>
            <Researcher key={4} />
          </PrivateRoute>

          <PrivateRoute path={`/buscar-investigador/:dni?`}>
            <SearchResearcher />
          </PrivateRoute>

          <PrivateRoute path={`/crear-proyecto`}>
            <Project key={5} />
          </PrivateRoute>

          <PrivateRoute path={`/ver-proyecto/:id_project`}>
            <Project key={6} />
          </PrivateRoute>

          <PrivateRoute path={`/buscar-proyecto/:id_project?`}>
            <SearchProject />
          </PrivateRoute>

          <PrivateRoute path={`/documentos-proyecto/:type/:id_project`}>
            <ProjectDocument />
          </PrivateRoute>

          <PrivateRoute path={`/gantt`}>
            <LinkedGantt />
          </PrivateRoute>

          <PrivateRoute path={`/crear-actividad`}>
            <Activity key={7} />
          </PrivateRoute>

          <PrivateRoute path={`/ver-actividad/:id_activity`}>
            <Activity key={8} />
          </PrivateRoute>

          <PrivateRoute path={`/documentos-actividad/:id_activity`}>
            <ActivityDocument />
          </PrivateRoute>

          <PrivateRoute path={`/buscar-actividad/:id_activity?`}>
            <SearchActivity />
          </PrivateRoute>

          <PrivateRoute path="/registrar-usuario">
            <Signup />
          </PrivateRoute>

          <PrivateRoute path={"/cambiar-contrasena"}>
            <ChangePassword />
          </PrivateRoute>

          <PrivateRoute path="/gestion-informacion">
            <ManageInfo />
          </PrivateRoute>

          <Route
            path={"/iniciar-sesion"}
            render={(routeProps) => {
              return <Login {...routeProps} updateLogged={this.updateLogged} />;
            }}
          />

          <Route
            path={"/reestablecer-contrasena/:token"}
            render={(routeProps) => {
              return <RecoverPassword {...routeProps} />;
            }}
          />

          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
        <Footer />
        <ScrollTop {...this.props}>
          <Fab color="secondary" size="small" aria-label="Ir arriba">
            <KeyboardArrowUpIcon />
          </Fab>
        </ScrollTop>
      </Fragment>
    );
  }
}

// export default App;
