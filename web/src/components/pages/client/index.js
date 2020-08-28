import React, {useState,useContext, useEffect} from 'react'
import Logo_Branco from '../../../assets/Logo_Branco.png'
import { makeStyles} from '@material-ui/core/styles'; 
import {IconButton} from '@material-ui/core'; //Customization
import {ExitToApp} from '@material-ui/icons'
import StoreContext from '../../store/Context'
import './styles.css'
import api from '../../../services/api';
const jwtDecode = require('jwt-decode');

const useStyles = makeStyles((theme) => ({
    icons:{
        color:'#FFFFFF',
    },
}))

export default () => {
    const classes = useStyles();
    const {tokenClient, signOut} = useContext(StoreContext);
    const [clientData, setClientData] = useState('');


    useEffect(() => {
        try{
            const token = JSON.parse(tokenClient());
            const clientToken = jwtDecode(token);

            api.defaults.headers.Authorization = `Bearer ${token}`;
            api.get(`/clients/${clientToken.id}`).then(response => {
            setClientData(response.data);
            });

        }catch(err){
            signOut();
        }
        
    }, []);

    const exitFromTheSystem = () =>{
        signOut();
    }

    function statusSelection(status){
        if(status === true){
            return 'Ativo'
        }else{
            return 'Inativo'
        }
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
                    <h1 className="h1-title">Seja bem-vindo {clientData.firstname}, confira suas informações e status:</h1>
                </div>
                <div className="container-content">
                    <div className="client-card">
                        <div className="container-card">
                            <div className="column1">

                                <h2 className="h2-nome">{clientData.firstname}</h2>
                                <h2 className="h2-styled">{clientData.lastname}</h2>

                                <img src={Logo_Branco} className="logo_modal" alt="Novo Net"/>
                            </div>
                            <div className="column2">
                                <div className="row1">
                                    <h2 className="h2-styled-branco">Cod:</h2>
                                    <h2 className="h2-modal" id="content">{clientData.code}</h2>
                                </div>
                                <div className="row2">
                                    <h2 className="h2-styled-branco">Status:</h2>
                                    <h2 className="h2-modal" id="content">{statusSelection(clientData.status)}</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>  
    );
}