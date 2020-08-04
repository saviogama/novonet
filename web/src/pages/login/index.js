import React, {useState} from 'react';
import Logo_Verde from '../../assets/Logo_Verde.png'
import './styles.css';

export default () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(e){
        e.preventDefault();
        
    }

    return(
        <div className="login-container">

            <img src={Logo_Verde} className="logo" alt="NovoNet"/>

            <div className="form-container">

                <form className="form" onSubmit={handleSubmit}>

                    <input className="input-email" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/>

                    <input className="input-password" type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)}/>

                    <button className="button-log" type="submit">Entrar</button>
                    <a className="link-forgot" href="/?">Esqueci a senha</a>

                </form>

            </div>

        </div>
    );
}