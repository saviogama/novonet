import React, {useState, useContext} from 'react';
import api from '../../../../../services/api'
import StoreContext from '../../../../store/Context'
import './register.css'

export default () => {
    const {tokenAdmin} = useContext(StoreContext);
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [rg, setRG] = useState('');
    const [cpf, setCPF] = useState('');
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');

    const token = JSON.parse(tokenAdmin());

    async function handleSubmit(e){
        e.preventDefault();
        try{
            api.defaults.headers.Authorization = `Bearer ${token}`;
            await api.post('/clients', {"email": email, "firstname": name, "lastname": lastName, "rg": rg, "cpf":cpf, "code": code, "password_entry": password})

            resetFields();
            alert('Cadastro de cliente concluido!');
        }catch(err){
            alert('Falha em registrar cliente.')
        }
    }

    function resetFields(){
        setName('');
        setLastName('');
        setPassword('');
        setEmail('');
        setRG('');
        setCPF('');
        setCode('');
    }
    return(
        <div className="container">

            <form className="form-container" onSubmit={(e) => handleSubmit(e)}>
                <div className="inputs-container">
                    <div className="inputs-coluna">
                        <input className="input-nome" type="text" placeholder="Nome" value={name} onChange={e => setName(e.target.value)}/>

                        <input className="input-lastName" type="text" placeholder="Sobrenome" value={lastName} onChange={e => setLastName(e.target.value)}/>

                        <input className="input-email" type="email" placeholder="Email (Min. 10)" value={email} onChange={e => setEmail(e.target.value)}/>

                        <input className="input-password" type="text" placeholder="Senha (Min. 6)" value={password} onChange={e => setPassword(e.target.value)}/>
                    </div>

                    <div className="inputs-coluna">
                        <input className="input-rg" type="text" placeholder="RG" value={rg} onChange={e => setRG(e.target.value)}/>

                        <input className="input-cpf" type="text" placeholder="CPF" value={cpf} onChange={e => setCPF(e.target.value)}/>

                        <input className="input-code" type="text" placeholder="Código de cliente" value={code} onChange={e => setCode(e.target.value)}/>
                    </div>
                </div>

                <button className="button" type="submit">Cadastrar Cliente</button> 

            </form>

        </div>
    );
}