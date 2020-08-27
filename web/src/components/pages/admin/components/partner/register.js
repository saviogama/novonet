import React, {useState, useContext} from 'react';
import api from '../../../../../services/api'
import StoreContext from '../../../../store/Context'
import './register.css'

export default () => {
    const {tokenAdmin} = useContext(StoreContext);
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [company, setCompany] = useState('');
    const [rg, setRG] = useState('');
    const [cpf, setCPF] = useState('');
    const [cnpj, setCNPJ] = useState('');


    const token = JSON.parse(tokenAdmin());

    async function handleSubmit(e){
        e.preventDefault();
        try{
            api.defaults.headers.Authorization = `Bearer ${token}`;
            
            await api.post('/partners', {"name": name, "email": email, "company_name":company, "rg": rg, "cpf":cpf, "cnpj":cnpj, "password_entry":password})

            resetFields();
            alert('Cadastro de parceiro concluído.')
        }catch(err){
            alert("Falha na tentativa de cadastro de parceiro.");
        }
    }

    function resetFields(){
        setName('');
        setPassword('');
        setEmail('');
        setCompany('');
        setRG('');
        setCPF('');
        setCNPJ('');
    }

    return(
        <div className="container">

            <form className="form-container" onSubmit={handleSubmit}>
                <div className="inputs-container">

                    <div className="inputs-coluna">

                        <input className="input-nome" type="text" placeholder="Nome (Min. 5)" value={name} onChange={e => setName(e.target.value)} min="5" max="50"/>

                        <input className="input-email" type="mail" placeholder="Email (Min. 10)" value={email} onChange={e => setEmail(e.target.value)} min="10" max="100"/>

                        <input className="input-password" type="text" placeholder="Senha (Min. 6)" value={password} onChange={e => setPassword(e.target.value)} min="6" max="100"/>

                        <input className="input-email" type="text" placeholder="Company" value={company} onChange={e => setCompany(e.target.value)} max="50"/>

                    </div>

                    <div className="inputs-coluna">
                        <input className="input-cnpj" type="text" placeholder="RG" value={rg} onChange={e => setRG(e.target.value)} min="7" max="10"/>

                        <input className="input-address" type="text" placeholder="CPF" value={cpf} onChange={e => setCPF(e.target.value)} min="11" max="15"/>

                        <input className="input-phone" type="text" placeholder="CNPJ" value={cnpj} onChange={e => setCNPJ(e.target.value)} min="12" max="50"/>
                    </div>
                </div>

                <button className="button" type="submit">Cadastrar Parceiro</button> 

            </form>

        </div>
    );
}