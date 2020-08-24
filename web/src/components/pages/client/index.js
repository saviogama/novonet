import React, {useContext} from 'react'
import Logo_Branco from '../../../assets/Logo_Branco.png'
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
                <div className="container-title">
                    <h1 className="h1-title">Seja bem-vindo, confira suas informações e status:</h1>
                </div>
                <div className="container-content">
                    <div className="client-card">
                        <div className="container-card">
                            <div className="column1">

                                <h2 className="h2-nome">Nome</h2>
                                <h2 className="h2-styled">Sobrenome</h2>

                                <div className="row1" id="margin">
                                    <h2 className="h2-modal" id="email">Email</h2>
                                </div>

                                <div className="row2">
                                    <h2 className="h2-modal">RG: RG</h2>
                                </div>

                                <div className="row3">
                                    <h2 className="h2-modal">CPF: CPF</h2>
                                </div>

                                <img src={Logo_Branco} className="logo_modal" alt="Novo Net"/>
                            </div>
                            <div className="column2">
                                <div className="row1">
                                    <h2 className="h2-styled-branco">Cod:</h2>
                                    <h2 className="h2-modal" id="content">001235</h2>
                                </div>
                                <div className="row2">
                                    <h2 className="h2-styled-branco">Status:</h2>
                                    <h2 className="h2-modal" id="content">Ativo</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>  
    );
}