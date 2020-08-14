import React from 'react'
import Logo_Branco from '../../assets/Logo_Branco.png'
import {useHistory} from 'react-router-dom';
import { makeStyles} from '@material-ui/core/styles'; 
import {IconButton} from '@material-ui/core'; //Customization
import {ExitToApp} from '@material-ui/icons'
import './styles.css'

const useStyles = makeStyles((theme) => ({
    icons:{
        color:'#FFFFFF',
    },
}))

export default () => {
    const classes = useStyles();
    const history = useHistory();

    const exitFromTheSystem = () =>{
        history.push('/');
    }

    return(
        <div className="container-client">
            <header>
                <img src={Logo_Branco} className="logo_header" alt="NovoNet"/>
                <div className="exitButton-container">
                    <IconButton className={classes.icons} onClick={exitFromTheSystem}>
                        <ExitToApp fontSize="large"/>
                    </IconButton>
                </div>
            </header>
            <main><h2>aaaaaaaaaa</h2></main>
        </div>  
    );
}