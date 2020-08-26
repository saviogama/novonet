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


    const token = tokenAdmin();

    async function handleSubmit(e){
        e.preventDefault();
        try{
            api.defaults.headers.Authorization = `Bearer ${token}`;
            const response = await api.post('/partners', {"name": name, "email": email, "company_name":company, "rg": rg, "cpf":cpf, "cnpj":cnpj, "password_entry":password})

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

                        <input className="input-nome" type="text" placeholder="Nome" value={name} onChange={e => setName(e.target.value)}/>

                        <input className="input-email" type="mail" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/>

                        <input className="input-password" type="text" placeholder="Senha: mín 6 caracteres" value={password} onChange={e => setPassword(e.target.value)}/>

                        <input className="input-email" type="text" placeholder="Company" value={company} onChange={e => setCompany(e.target.value)}/>

                    </div>

                    <div className="inputs-coluna">
                        <input className="input-cnpj" type="text" placeholder="RG" value={rg} onChange={e => setRG(e.target.value)}/>

                        <input className="input-address" type="text" placeholder="CPF" value={cpf} onChange={e => setCPF(e.target.value)}/>

                        <input className="input-phone" type="text" placeholder="CNPJ" value={cnpj} onChange={e => setCNPJ(e.target.value)}/>
                    </div>
                </div>

                <button className="button" type="submit">Cadastrar Parceiro</button> 

            </form>

        </div>
    );
}