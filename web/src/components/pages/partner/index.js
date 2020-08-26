import React, {useState, useContext, useEffect} from 'react'
import Logo_Branco from '../../../assets/Logo_Branco.png'
import { makeStyles} from '@material-ui/core/styles'; 
import {IconButton} from '@material-ui/core'
import {ExitToApp} from '@material-ui/icons'
import StoreContext from '../../store/Context'
import Modal from '../admin/components/Modal'
import api from '../../../services/api'
import './styles.css'
const jwtDecode = require('jwt-decode');


const useStyles = makeStyles((theme) => ({
    icons:{
        color:'#FFFFFF',
    },
}))




export default () => {

    const classes = useStyles();
    const {tokenPartner, signOut} = useContext(StoreContext);
    const [codeSearch, setCodeSearch] = useState('');
    const [clientSearched, setClientSearched] = useState('');
    const [modal, setModal] = useState(false);
    const [token, setToken] = useState('');
    const [partnerData, setPartnerData] = useState('');

    useEffect(() => {
        try{
            const token = JSON.parse(tokenPartner());
            const partnerToken = jwtDecode(token);

            api.defaults.headers.Authorization = `Bearer ${token}`;
            api.get(`/partners/${partnerToken.id}`).then(response => {
                setPartnerData(response.data);
            });

            setToken(token);

        }catch(err){
            signOut();
        }
    }, [partnerData])

    
    function openModal(){
        if(modal){
            return(
                <Modal stateModal={modal} setStateModal={(bool) => setModal(bool)} modalProfile={clientSearched} partner={true}/>
            )
        }
    }


    const exitFromTheSystem = () =>{
        signOut();
    }


    async function handleSearch(){
        api.defaults.headers.Authorization = `Bearer ${token}`;
        try{
            const response = await api.get('/clients/data', {"code": codeSearch});
            setClientSearched(response.data[0])
            setModal(true)

        }catch(err){
            alert('Falha na busca, tente outro Código');
        }
    }

    return(
        <div className="container-partner">
            <header>
                <img src={Logo_Branco} className="logo_header" alt="NovoNet"/>
                <div className="exitButton-container">
                    <IconButton className={classes.icons} onClick={exitFromTheSystem}>
                        <ExitToApp fontSize="large"/>
                    </IconButton>
                </div>
            </header>
            <main id="main-partner">
                <div className="container-search">
                    <input type="text" placeholder="Código do cliente" className="input" value={codeSearch} onChange={e => setCodeSearch(e.target.value)}/>

                    <button className="button" id="button_partner" onClick={() => handleSearch()}>Buscar Cliente</button> 
                </div>
                {openModal()}
            </main>
        </div>
    );
}
