import React, {useContext} from 'react'
import Logo_Branco from '../../../assets/Logo_Branco.png'
import Ativo from '../../../assets/Ativo-image.png'
import {useHistory} from 'react-router-dom';
import { makeStyles} from '@material-ui/core/styles'; 
import {IconButton} from '@material-ui/core'; //Customization
import {ExitToApp} from '@material-ui/icons'
import StoreContext from '../../store/Context'
import './styles.css'

const useStyles = makeStyles((theme) => ({
    icons:{
        color:'#FFFFFF',
    },
}))

export default () => {
    const classes = useStyles();
    const history = useHistory();
    const {removeTokenClient} = useContext(StoreContext);

    const exitFromTheSystem = () =>{
        removeTokenClient();
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
            <main id="main-client">
                <h2>Olá caro cliente, você está ativo no sistema!</h2>
                <img src={Ativo} className="ativo-image" alt="Ativo no sistema"/>
            </main>
        </div>  
    );
}