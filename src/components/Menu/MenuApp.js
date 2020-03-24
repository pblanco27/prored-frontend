import React from "react";
import clsx from "clsx";
import { Link } from 'react-router-dom'
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import NoteIcon from "@material-ui/icons/Note";
import HomeIcon from "@material-ui/icons/Home";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import FaceIcon from "@material-ui/icons/Face";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex" , 

  },
  appBar: {
    height: 70,
    background: "#00519b",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
}));

        export default function PersistentDrawerLeft() {
            const classes = useStyles();
            const theme = useTheme();
            const [open, setOpen] = React.useState(false);
            const [anchorEl, setAnchorEl] = React.useState(null);

            const handleClick = event => {
                setAnchorEl(event.currentTarget);
            };

            const handleClose = () => {
                setAnchorEl(null);
            };

            const handleDrawerOpen = () => {
                setOpen(true);
            };

            const handleDrawerClose = () => {
                setOpen(false);
            };

            return (
                <div className={classes.root}>
                    <CssBaseline />
                    <AppBar
                        position="flex" 
                        className={clsx(classes.appBar, {
                        [classes.appBarShift]: open
                        })}
                    >
                        <Toolbar>
                        
                        <IconButton 
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, open && classes.hide)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography display='initial' variant="h6" noWrap>
                            Menú
                        </Typography>
                        </Toolbar>
                    </AppBar>
                    <Drawer
                        className={classes.drawer}
                        variant="persistent"
                        anchor="left"
                        open={open}
                        classes={{
                        paper: classes.drawerPaper
                        }}
                    >
                        {<div><br></br><br></br></div>}
                        <div className={classes.drawerHeader}>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === "ltr" ? (
                            <div>  <ChevronLeftIcon />
                            <ChevronLeftIcon />
                            <ChevronLeftIcon /></div>
                            ) : (
                            <ChevronRightIcon />

                            )}
                        </IconButton>
                        </div>
                        <Divider />
                        <List>
                        <ListItem  button key={"Inicio"}>
                            <ListItemIcon>
                            <HomeIcon />
                            </ListItemIcon>
                            <Link className="nav-link" to="/">Inicio</Link>
                        </ListItem>

                        <ListItem
                            button
                            key={"Vinculado"}
                            onClick={handleClick}
                            aria-controls="simple-menu"
                            aria-haspopup="true"
                        >
                            <ListItemIcon>
                            <FaceIcon />
                            </ListItemIcon>
                            <Link className="nav-link" >Gestión de información</Link>
                        </ListItem>

                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                                <SupervisedUserCircleIcon />
                            </ListItemIcon>
                            <Link className="nav-link" to="/verVinculado">Ver vinculado</Link>
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                                <EmojiPeopleIcon />
                            </ListItemIcon>
                            <Link className="nav-link" to="/registroVinculado">Registrar vinculado</Link>
                            </MenuItem>
                        </Menu>

                        <ListItem button key={"Gestión de información"}>
                            <ListItemIcon>
                            <NoteIcon />
                            </ListItemIcon>
                            <Link className="nav-link" to="/gestionInformacion">Gestión de información</Link>
                        </ListItem>
                        </List>
                    </Drawer>
                </div>
                
            );
        }