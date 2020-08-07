import React, {useState} from 'react'
import './visualize.css'

export default () => {
    const clientes = [{
        nome:"João",
        codigo:"0008124",
        status:"ativo",
    },
    {
        nome:"João",
        codigo:"0008124",
        status:"ativo",
    },
    {
        nome:"Lucia",
        codigo:"000325418124",
        status:"Inativo",
    },
    {
        nome:"Jaqueline",
        codigo:"0008122424",
        status:"Ativo",
    },
    {
        nome:"Marcos",
        codigo:"666333",
        status:"Ativo",
    },
    {
        nome:"Maria",
        codigo:"099999514",
        status:"Inativa",
    },
    {
        nome:"Marcos da fé",
        codigo:"6663",
        status:"Ativo",
    },
    {
        nome:"Maria do carmo",
        codigo:"099999514",
        status:"Inativa",
    },
    {
        nome:"Marcos da fé",
        codigo:"666333",
        status:"Ativo",
    },
    {
        nome:"Maria do carmo",
        codigo:"099999514",
        status:"Inativa",
    },
    {
        nome:"Marcos da fé",
        codigo:"6663443",
        status:"Ativo",
    },
    {
        nome:"Maria do carmo da silva pereira",
        codigo:"099999514",
        status:"Inativa",
    }];

    const [code, setCode] = useState('');
    const [name, setName] = useState('');
    const [clients, setClients] = useState(clientes);

    function handleCode(e){
        setCode(e);

        if(name === '' && e === ''){
            setClients(clientes);
        }else if(e !== '' && name !== ''){
            setClients(clientes.filter((client, index, array) => client.codigo === e && client.nome === name));
        }else if(e === '' && name !== ''){
            console.log(name);
            setClients(clientes.filter((client, index, array) => client.nome === name));
        }else{
            setClients(clientes.filter((client, index, array) => client.codigo === e));
        }

    }

    function handleNameSearch(e){
        setName(e);

        if(e === '' && code === ''){
            setClients(clientes);
        }else if(e !== '' && code !== ''){
            setClients(clientes.filter((client, index, array) => client.nome === e && client.codigo === code));
        }else if(e === '' && code !== ''){
            setClients(clientes.filter((client, index, array) => client.codigo === code));
        }else{
            setClients(clientes.filter((client, index, array) => client.nome === e));
        }
    }



    return(
        <div className="container-visualize_cliente">
            <div className="search-container">
                <input className="input-code" type="text" placeholder="Código do cliente" value={code} onChange={e => handleCode(e.target.value)}/>
                <input className="input-name" type="text" placeholder="Nome do cliente" value={name} onChange={e => handleNameSearch(e.target.value)}/>
            </div>

            <div className="table-container">
                <table className="table-clients">
                    <thead>
                        <tr className="header-table">
                            <th>Nome</th>
                            <th>Código</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            clients.map(client => (
                                <tr className="data-row">
                                    <td>{client.nome}</td>
                                    <td>{client.codigo}</td>
                                    <td>{client.status}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}