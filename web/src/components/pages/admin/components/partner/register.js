import React, {useState} from 'react';
import './register.css'

export default () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [company, setCompany] = useState('');
    const [rg, setRG] = useState('');
    const [cpf, setCPF] = useState('');
    const [cnpj, setCNPJ] = useState('');

    function handleSubmit(e){
        e.preventDefault();
        console.log(name, email, company, rg, cpf, cnpj);
    }
    return(
        <div className="container">

            <form className="form-container" onSubmit={handleSubmit}>
                <div className="inputs-container">

                    <div className="inputs-coluna">

                        <input className="input-nome" type="text" placeholder="Nome" value={name} onChange={e => setName(e.target.value)}/>

                        <input className="input-password" type="mail" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/>

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