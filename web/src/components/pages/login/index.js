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


    async function handleSubmitAdmin(e){
        e.preventDefault();

        try{
            const responseAdmin = await api.post('/admin-session', {"email":email, "password_entry": password});
            setTokenAdmin(responseAdmin.token);

            api.defaults.headers.Authorization = `Bearer ${responseAdmin.token}`;

            history.push('/admin');
        }catch(err){
            try{
                const responsePartner = await api.post('/partner-session', {"email":email, "password_entry": password});
                setTokenPartner(responsePartner.token);

                api.defaults.headers.Authorization = `Bearer ${responsePartner.token}`;

                history.push('/parceiro');
            }catch(err){
                alert('Falha no login, tente novamente.');
            }
        }
    }

    async function handleSubmitClient(e){
        e.preventDefault();
        try{
            const responseClient = await api.post('/client-session', {"code":codeClient});
            setTokenClient(responseClient.token);

            api.defaults.headers.Authorization = `Bearer ${responseClient.token}`;
            history.push('/cliente');
       }catch(err){
            alert('Falha no login, tente novamente.');
       }
    }

    if(!clientLoginForm){
        return(
            <div className="login-container">
    
                <img src={Logo_Verde} className="logo" alt="NovoNet"/>
    
                <div className="form-container-login">
    
                    <form className="form" onSubmit={handleSubmitAdmin}>
    
                        <input className="input-email" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/>
    
                        <input className="input-password" type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)}/>
    
                        <button className="button" type="submit">Entrar</button>
                        
                        <div className="links-container">
                            <a className="link-forgot">Esqueci a senha</a>
                            <a>|</a> 
                            <a className="link-client"  onClick={e => setClientLoginForm(true)}>Sou cliente</a>
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
    
                    <form className="form" onSubmit={handleSubmitClient}>
    
                        <input className="input-code" type="text" placeholder="Código" value={codeClient} onChange={e => setCodeClient(e.target.value)}/>
    
                        <button className="button" type="submit">Entrar</button>
                        
                        <div className="links-container"> 
                            <a className="link-client" onClick={e => setClientLoginForm(false)}>Voltar</a>
                        </div>
    
                    </form>
    
                </div>
    
            </div>
        );
    }
}