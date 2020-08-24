import React, {useState, useContext} from 'react'
import Logo_Branco from '../../../assets/Logo_Branco.png'
import {useHistory} from 'react-router-dom';
import { makeStyles} from '@material-ui/core/styles'; 
import {IconButton} from '@material-ui/core'
import {ExitToApp} from '@material-ui/icons'
import StoreContext from '../../store/Context'
import Api from '../../../services/api'
import './styles.css'


const useStyles = makeStyles((theme) => ({
    icons:{
        color:'#FFFFFF',
    },
}))




export default () => {

    const classes = useStyles();
    const history = useHistory();
    const {removeTokenPartner} = useContext(StoreContext);
    const [codeSearch, setCodeSearch] = useState('');

    const exitFromTheSystem = () =>{
        removeTokenPartner();
        history.push('/');
    }

    async function handleSearch(){
        //const clientSearched = await api.get
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
            </main>
        </div>
    );
}
