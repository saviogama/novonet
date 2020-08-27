import React, {useState} from 'react'
import {useHistory} from 'react-router-dom';
import Logo_Verde from '../../../assets/Logo_Verde.png'
import api from '../../../services/api'
import './styles.css';

export default () =>{

    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmitRegisteAdmin(e){
        e.preventDefault()
        try{
            await api.post('/access-admin', {"email": email, "name": "admin", "password_entry": password})
            alert('Cadastro realizado com sucesso!')
            history.push('/');
        }catch(err){
            alert('Cadastro mal sucedido!');
        }
    }

    return(
        <div className="login-container">
    
                <img src={Logo_Verde} className="logo" alt="NovoNet"/>
    
                <div className="form-container-login">
    
                    <form className="form" onSubmit={handleSubmitRegisteAdmin}>
    
                        <input className="input-email" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/>
    
                        <input className="input-password" type="password" placeholder="Senha - 10 caracteres" value={password} onChange={e => setPassword(e.target.value)}/>
    
                        <button className="button" type="submit">Registrar Admin</button>
    
                    </form>
    
                </div>
    
            </div>
    );
}