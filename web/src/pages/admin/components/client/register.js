import React, {useState} from 'react';
import './register.css'

export default () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [rg, setRG] = useState('');
    const [cpf, setCPF] = useState('');

    function handleSubmit(e){
        e.preventDefault();
        console.log(name, email, rg, cpf);
    }
    return(
        <div className="container">

            <form className="form-container" onSubmit={handleSubmit}>
                <div className="inputs-container">
                    <div className="inputs-coluna">
                        <input className="input-email" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/>

                        <input className="input-nome" type="text" placeholder="Nome" value={name} onChange={e => setName(e.target.value)}/>
                    </div>

                    <div className="inputs-coluna">
                        <input className="input-rg" type="text" placeholder="RG" value={rg} onChange={e => setRG(e.target.value)}/>

                        <input className="input-cpf" type="text" placeholder="CPF" value={cpf} onChange={e => setCPF(e.target.value)}/>
                    </div>
                </div>

                <button className="button" type="submit">Cadastrar Cliente</button> 

            </form>

        </div>
    );
}