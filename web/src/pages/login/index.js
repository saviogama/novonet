import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import Logo_Verde from '../../assets/Logo_Verde.png'
import './styles.css';

export default () => {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [codeClient, setCodeClient] = useState('');
    const [clientLogin, setClientLogin] = useState(false);


    function handleSubmitAdmin(e){
        e.preventDefault();
        history.push('/admin');
    }

    function handleSubmitClient(e){
        e.preventDefault();
        history.push('/client');
    }

    if(!clientLogin){
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
                            <a className="link-client"  onClick={e => setClientLogin(true)}>Sou cliente</a>
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
                            <a className="link-forgot">Esqueci a senha</a>
                            <a>|</a> 
                            <a className="link-client" onClick={e => setClientLogin(false)}>Voltar</a>
                        </div>
    
                    </form>
    
                </div>
    
            </div>
        );
    }
}