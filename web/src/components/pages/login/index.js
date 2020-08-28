import React, {useState, useContext} from 'react';
import StoreContext from '../../store/Context'
import {useHistory} from 'react-router-dom';
import Logo_Verde from '../../../assets/Logo_Verde.png'
import api from '../../../services/api'

import './styles.css';

export default () => {
    const history = useHistory();
    const {setTokenAdmin, setTokenClient, setTokenPartner} = useContext(StoreContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [codeClient, setCodeClient] = useState('');
    const [clientLoginForm, setClientLoginForm] = useState(false);
    const [partnerLoginForm, setPartnerLoginForm] = useState(false);
    const [adminLoginForm, setAdminLoginForm] = useState(true);


    async function handleSubmitAdmin(e){
        e.preventDefault();

        try{
            const responseAdmin = await api.post('/access-admin-session', {"email":email, "password_entry": password});
            setTokenAdmin(responseAdmin.data.token);

            history.push('/admin');

        }catch(err){
            alert('Falha no login, tente novamente.');
            console.log(err);
        }
    }

    async function handleSubmitPartner(e){
        e.preventDefault();
        try{
            const responsePartner = await api.post('/partners-session', {"email":email, "password_entry": password});
            setTokenPartner(responsePartner.data.token);

            history.push('/parceiro');
        }catch(err){
            alert('Falha no login, tente novamente.');
        }
    }

    async function handleSubmitClient(e){
        e.preventDefault();
        try{
            const responseClient = await api.post('/clients-session', {"code": codeClient});
            setTokenClient(responseClient.data.token);
            history.push('/cliente');
            
       }catch(err){
            alert('Falha no login, tente novamente.');
       }
    }

    if(adminLoginForm){
        return(
            <div className="login-container">
    
                <img src={Logo_Verde} className="logo" alt="NovoNet"/>
    
                <div className="form-container-login">
    
                    <form className="form" onSubmit={(e) => handleSubmitAdmin(e)}>
    
                        <input className="input-email" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/>
    
                        <input className="input-password" type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)}/>
    
                        <button className="button" type="submit">Entrar</button>
                        
                        <div className="links-container">
                            <a className="link-client"  onClick={e => {setClientLoginForm(true); setAdminLoginForm(false)}}>Sou cliente</a>
                            <a> | </a>
                            <a className="link-partner" onClick={e => {setPartnerLoginForm(true); setAdminLoginForm(false)}}>Parceiro</a>
                        </div>
    
                    </form>
    
                </div>
    
            </div>
        );
    }else if(partnerLoginForm){
        return(
                <div className="login-container">
            
                <img src={Logo_Verde} className="logo" alt="NovoNet"/>

                <div className="form-container-login">

                    <form className="form" onSubmit={(e) => handleSubmitPartner(e)}>

                        <input className="input-email" type="email" placeholder="Email de parceiro" value={email} onChange={e => setEmail(e.target.value)}/>

                        <input className="input-password" type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)}/>

                        <button className="button" type="submit">Entrar</button>
                        
                        <div className="links-container">
                            <a className="link-client"  onClick={e => {setClientLoginForm(true); setPartnerLoginForm(false)}}>Sou cliente</a>
                            <a> | </a>
                            <a className="link-partner" onClick={e => {setAdminLoginForm(true); setPartnerLoginForm(false)}}>Voltar</a>
                        </div>

                    </form>

                </div>

            </div>
        );
    }else{
        return(
            <div className="login-container">
    
                <img src={Logo_Verde} className="logo" alt="NovoNet"/>
    
                <div className="form-container-login">
    
                    <form className="form" onSubmit={(e) => handleSubmitClient(e)}>
    
                        <input className="input-code" type="text" placeholder="Código" value={codeClient} onChange={e => setCodeClient(e.target.value)}/>
    
                        <button className="button" type="submit">Entrar</button>
                        
                        <div className="links-container"> 
                            <a className="link-client" onClick={e => {setClientLoginForm(false); setAdminLoginForm(true)}}>Voltar</a>
                        </div>
    
                    </form>
    
                </div>
    
            </div>
        );
    }
}