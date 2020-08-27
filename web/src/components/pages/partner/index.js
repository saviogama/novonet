import React, {useState, useContext, useEffect} from 'react'
import Logo_Branco from '../../../assets/Logo_Branco.png'
import { makeStyles} from '@material-ui/core/styles'; 
import {IconButton} from '@material-ui/core'
import {ExitToApp, AccountBox} from '@material-ui/icons'
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
    const [profileModal, setProfileModal] = useState('');
    const [modal, setModal] = useState(false);
    const [token, setToken] = useState('');
    const [partnerData, setPartnerData] = useState('');

    const [clientCard, setClientCard] = useState(false);
    const [partnerProfile, setPartnerProfile] = useState(false);

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
    }, [])

    
    function openModal(){
        if(modal){
            return(
                <Modal stateModal={modal} setStateModal={(bool) => setModal(bool)} modalProfile={profileModal} partner={clientCard} partnersProfile={partnerProfile}/>
            )
        }
    }


    const exitFromTheSystem = () =>{
        signOut();
    }


    async function handleSearch(){
        api.defaults.headers.Authorization = `Bearer ${token}`;
        try{
            const response = await api.post('/clients/data', {"code": codeSearch});
            setProfileModal(response.data)
            setClientCard(true);
            setModal(true)

        }catch(err){
            alert('Falha na busca, tente outro Código');
        }
    }

    function openProfile(){
        setProfileModal(partnerData);
        setPartnerProfile(true);
        setModal(true);
    }

    return(
        <div className="container-partner">
            <header>
                <img src={Logo_Branco} className="logo_header" alt="NovoNet"/>
                <div className="exitButton-container">
                    <IconButton className={classes.icons} onClick={openProfile}>
                        <AccountBox fontSize="large"/>
                    </IconButton>
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
