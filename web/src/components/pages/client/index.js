import React, {useState,useContext, useEffect} from 'react'
import Logo_Carteira from '../../../assets/carteirinha/frente/empresa.png'
import Grupo_Direita from '../../../assets/carteirinha/frente/grupo direita.svg'
import Grupo_DireitaBack from '../../../assets/carteirinha/verso/grupo_direta.svg'
import Grupo_Esquerda from '../../../assets/carteirinha/frente/Grupo esquerda.svg'
import RedesSociais from '../../../assets/carteirinha/verso/redes_sociais.png'
import Logo_Branco from '../../../assets/Logo_Branco.png'
import { makeStyles} from '@material-ui/core/styles'; 
import {IconButton} from '@material-ui/core';
import {ExitToApp, SwapVerticalCircle} from '@material-ui/icons'
import StoreContext from '../../store/Context'
import './styles.css'
import api from '../../../services/api';
const jwtDecode = require('jwt-decode');
const QRCode = require('qrcode.react');
 

const useStyles = makeStyles((theme) => ({
    icons:{
        color:'#FFFFFF',
    },
}))

export default () => {
    const classes = useStyles();
    const {tokenClient, signOut} = useContext(StoreContext);
    const [clientData, setClientData] = useState('');
    const [sideCard, setSideCard] = useState(true);


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
    

    if(sideCard){
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
                        <IconButton onClick={() => setSideCard(false)}>
                            <SwapVerticalCircle/>
                        </IconButton>
                        <div className="client-card">
                            <img src={Grupo_Esquerda} className="grupo_esquerda" alt="Linhas verticais"/>
                            <div className="container-card">
                                <div className="column1">
    
                                    <h2 className="h2-nome">{clientData.firstname}</h2>
                                    <h2 className="h2-styled">{clientData.lastname}</h2>
    
                                    <img src={Logo_Carteira} className="logo_carteira" alt="Novo Net"/>
                                </div>
                                <div className="column2">
                                    <img src={Grupo_Direita} className="grupo_direita" alt="Linhas horizontais"/>
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
    }else{
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
                        <IconButton onClick={() => setSideCard(true)}>
                            <SwapVerticalCircle/>
                        </IconButton>
                        <div className="client-card">
                            <div className="container-card-backside">
                                <div className="column1-backside">
                                    <QRCode value={clientData.code} renderAs='svg' size='158' bgColor='#065048' fgColor='#ccd336' />
                                    <img src={Logo_Carteira} className="logo_carteira-verso" alt="Novo Net"/>
                                </div>
                                <div className="column2-backside">
                                    <h2 className="texto-backside">É obrigatório a apresentação de um documento com foto comprovando a titularidade</h2>
                                    <img src={Grupo_DireitaBack} className="grupo-direita-backside" alt="Linhas horizontais" />
                                    <img src={RedesSociais} className="redes-sociais" alt="NOVONetoficial"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div> 
        );
    }
}