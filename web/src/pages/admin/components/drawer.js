import React from 'react';
import clsx from 'clsx';
import {Link, useHistory} from 'react-router-dom';

import {Drawer, AppBar, Toolbar} from '@material-ui/core'; //Estructure
import { makeStyles, useTheme } from '@material-ui/core/styles'; //Style
import {List, ListItem, ListItemIcon, ListItemText} from '@material-ui/core'; //List
import {Divider, IconButton, Collapse} from '@material-ui/core'; //Customization
import {Dashboard, Home, ChevronLeft, Menu, ExpandLess, ExpandMore, SupervisorAccount, Search, Assignment, BusinessCenter} from '@material-ui/icons' //Icons

import Logo_Branco from '../../../assets/Logo_Branco.png';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background: '#009181',
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#009181',
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'space-between',
    backgroundColor:'#009181',
  },
  icons: {
    color: '#FFFFFF',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },

  itemList:{
    height: 60,
  },

  logoImg:{
    width: 180,
  },

  mainContent:{
    margin: 50,
  },

  text:{
    color: '#FFFFFF',
  },

  textList: {
    fontSize: '2em',
    color: '#FFFFFF',
  },

  nested: {
    paddingLeft: theme.spacing(4),
  },

  list: {
    padding: 0,
  }

}));

export default function PersistentDrawerLeft(props) {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const [statusDrawer, setStatusDrawer] = React.useState(false); //Status => open/closed
  const [openClientes, setOpenClientes] = React.useState(false);
  const [openParceiros, setOpenParceiros] = React.useState(false);
  const [itemSelected, setItemSelected] = React.useState(1);
  
  const handleClickClientes = () =>{
    setOpenClientes(!openClientes);
  }

  const handleClickParceiros = () =>{
    setOpenParceiros(!openParceiros);
  }

  const handleDrawer = () => {
    setStatusDrawer(!statusDrawer);
  };

  const handleListItemSelection = (event, index) => {
    setItemSelected(index);
    if(index === 1){
      history.push('/admin');
    }else if(index === 2){
      history.push('/admin/clientes');
    }
  }


  return (
    <div className={classes.root}>

      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: statusDrawer,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            focusRipple
            aria-label="open drawer"
            onClick={handleDrawer}
            edge="start"
            className={clsx(classes.menuButton, statusDrawer && classes.hide)}>

            <Menu />

          </IconButton>

          <img src={Logo_Branco} className={classes.logoImg} alt="NovoNet"/>

        </Toolbar>

      </AppBar>

      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={statusDrawer}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <Dashboard className={classes.icons}/>
          <h2 className={classes.text}>Painel Admin</h2>
          <IconButton onClick={handleDrawer}>
            <ChevronLeft className={classes.icons}/>
          </IconButton>
        </div>

        <Divider />

        <List className={classes.list}>
          <ListItem button selected={itemSelected === 1} onClick = {(event) => handleListItemSelection(event, 1)} className={classes.itemList}>
              <ListItemIcon>
                  <Home className={classes.icons}/>
              </ListItemIcon>
              <ListItemText  primary="Home" className={classes.textList}/>
          </ListItem>


          <ListItem button onClick={handleClickClientes} className={classes.itemList}>
            <ListItemIcon>
              <SupervisorAccount className={classes.icons}/>
            </ListItemIcon>
            <ListItemText primary="Clientes" className={classes.text}/>
            {openClientes ? <ExpandLess className={classes.icons}/> : <ExpandMore className={classes.icons}/>}
          </ListItem>

          <Collapse in={openClientes} timeout="auto" unmountOnExit>

            <List component="div" disablePadding>
              <ListItem button selected={itemSelected === 2} onClick = {(event) => handleListItemSelection(event, 2)}className={classes.nested}>
                <ListItemIcon>
                  <Search className={classes.icons}/>
                </ListItemIcon>
                <ListItemText primary="Vizualizar" className={classes.text}/>
              </ListItem>

              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <Assignment className={classes.icons}/>
                </ListItemIcon>
                <ListItemText primary="Cadastrar" className={classes.text}/>
              </ListItem>
            </List>


          </Collapse>


          <ListItem button onClick={handleClickParceiros} className={classes.itemList}>
            <ListItemIcon>
              <BusinessCenter className={classes.icons}/>
            </ListItemIcon>
            <ListItemText primary="Parceiros" className={classes.text}/>
            {openParceiros? <ExpandLess className={classes.icons}/> : <ExpandMore className={classes.icons}/>}
          </ListItem>

          <Collapse in={openParceiros} timeout="auto" unmountOnExit>

            <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <Search className={classes.icons}/>
                </ListItemIcon>
                <ListItemText primary="Vizualizar" className={classes.text}/>
              </ListItem>

              <ListItem button className={classes.nested}>
                <ListItemIcon>
                  <Assignment className={classes.icons}/>
                </ListItemIcon>
                <ListItemText primary="Cadastrar" className={classes.text}/>
              </ListItem>
            </List>


          </Collapse>

        </List>


      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: statusDrawer,
        })}
      >
        <div className={classes.mainContent} />
        {props.children}
      </main>
    </div>
  );
}