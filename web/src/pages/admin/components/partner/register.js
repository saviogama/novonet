import React, {useState} from 'react';
import './register.css'

export default () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [cnpj, setCNPJ] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');

    function handleSubmit(e){
        e.preventDefault();
        console.log(name, password, email, cnpj, address, phone);
    }
    return(
        <div className="container">

            <form className="form-container" onSubmit={handleSubmit}>
                <div className="inputs-container">

                    <div className="inputs-coluna">

                        <input className="input-nome" type="text" placeholder="Nome" value={name} onChange={e => setName(e.target.value)}/>

                        <input className="input-password" type="text" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)}/>

                        <input className="input-email" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/>

                    </div>

                    <div className="inputs-coluna">
                        <input className="input-cnpj" type="text" placeholder="CNPJ" value={cnpj} onChange={e => setCNPJ(e.target.value)}/>

                        <input className="input-address" type="text" placeholder="Endereço" value={address} onChange={e => setAddress(e.target.value)}/>

                        <input className="input-phone" type="tel" pattern="[0-9]{2} [0-9]{5}-[0-9]{4}" placeholder="Telefone: (DDD 99999-9999)" value={phone} onChange={e => setPhone(e.target.value)}/>
                    </div>
                </div>

                <button className="button" type="submit">Cadastrar Parceiro</button> 

            </form>

        </div>
    );
}