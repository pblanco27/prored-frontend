import React from "react";
import Zoom from "@material-ui/core/Zoom";
import { makeStyles } from "@material-ui/core/styles";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import $ from "jquery";

/**
 * * Clases de CSS utilizadas por el botón
 */
const useStyles = makeStyles((theme) => ({
  root: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

/**
 * * Componente de Material UI
 * * Consiste de un botón capaz de redirigir al
 * * usuario al principio de la página inicial
 */
export default function ScrollTop(props) {
  const { children } = props;
  const classes = useStyles();
  const trigger = useScrollTrigger();

  const handleClick = (event) => {
    $("html, body").animate({ scrollTop: 0 }, "slow");
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        {children}
      </div>
    </Zoom>
  );
}
