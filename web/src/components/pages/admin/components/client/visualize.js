import React, {useState} from 'react'
import {Create, Delete, Done, Close, AccountBox} from '@material-ui/icons'
import {IconButton} from '@material-ui/core'
import {AutoSizer, List} from 'react-virtualized';
import Modal from '../Modal'

import './visualize.css'

export default () => {
    const clientes = [{
        name:"João",
        lastname: "Dória",
        email: "jo@hotmail.com",
        rg: "5.524.632",
        cpf: "123.456.789-00",
        code:"0008124",
        status:"ativo",
    },
    {
        name:"Maria",
        lastname: "Glória",
        email: "mari.10@hotmail.com",
        rg: "9.414.632",
        cpf: "023.446.789-20",
        code:"3216549",
        status:"Inativo",
    },
    {
        name:"Rodrigo",
        lastname: "Gusmão",
        email: "rogriguinho@bol.com",
        rg: "9.050.134",
        cpf: "234.754.124-82",
        code:"00038124",
        status:"ativo",
    },
    {
        name:"João",
        lastname: "Dória",
        email: "jo@hotmail.com",
        rg: "5.524.632",
        cpf: "123.456.789-00",
        code:"000812435",
        status:"ativo",
    },
];

    const [clients, setClients] = useState(clientes);
    const [codeSearch, setCodeSearch] = useState('');
    const [nameSearch, setNameSearch] = useState('');

    const [indexTableEdit, setIndexTableEdit] = useState('');
    const [nameEditable, setNameEditable] = useState('');

    const [modal, setModal] = useState(false);
    const [clientModal, setClientModal] = useState('');


    function getDataAndOpenModal(index){
        setClientModal(clients[index]);
        setModal(true);
    }

    function openModal(){
        if(modal){
            return(
                <Modal stateModal={modal} setStateModal={(bool) => setModal(bool)} modalProfile={clientModal}/>
            )
        }
    }


    function openEditTablesIndex(index){
        setIndexTableEdit(index);
        setNameEditable(clients[index].name);
    }

    function cancelEdit(){
        setIndexTableEdit('');
        setNameEditable('');
    }

    function deleteTablesIndex(){
        console.log('Delete');
    }

    
    function searchByCode(codePassedForSearch){
        setIndexTableEdit('');
        setNameEditable('');

        setCodeSearch(codePassedForSearch);

        if(nameSearch === '' && codePassedForSearch === ''){
            setClients(clientes);
        }else if(codePassedForSearch !== '' && nameSearch !== ''){
            setClients(clientes.filter((client, index, array) => client.code === codePassedForSearch && client.name === nameSearch));
        }else if(codePassedForSearch === '' && nameSearch !== ''){
            console.log(nameSearch);
            setClients(clientes.filter((client, index, array) => client.name === nameSearch));
        }else{
            setClients(clientes.filter((client, index, array) => client.code === codePassedForSearch));
        }

    }

    function searchByName(namePassedForSearch){
        setIndexTableEdit('');
        setNameEditable('');

        setNameSearch(namePassedForSearch);

        if(namePassedForSearch === '' && codeSearch === ''){
            setClients(clientes);
        }else if(namePassedForSearch !== '' && codeSearch !== ''){
            setClients(clientes.filter((client, index, array) => client.name === namePassedForSearch && client.code === codeSearch));
        }else if(namePassedForSearch === '' && codeSearch !== ''){
            setClients(clientes.filter((client, index, array) => client.code === codeSearch));
        }else{
            setClients(clientes.filter((client, index, array) => client.name === namePassedForSearch));
        }
    }

    
    function renderList({
        key, // Unique key within array of rows
        index, // Index of row within collection
        isScrolling, // The List is currently being scrolled
        isVisible, // This row is visible within the List (eg it is not an overscanned row)
        style, // Style object to be applied to row (to position it)
    }){
        if(index === indexTableEdit){
            return(
                <tr key={key} style={style} className="data-row-client">
                    <td><input className="input-edit-row"type="text"  value={nameEditable} onChange={e => setNameEditable(e.target.value)}></input></td>
                    <td>{clients[index].lastname}</td>
                    <td>{clients[index].code}</td>
                    <td>{clients[index].status}</td>

                    <td className="icon">
                        <IconButton>
                            <Done/>
                        </IconButton>
                    </td>
                    <td className="icon">
                        <IconButton onClick={() => cancelEdit()}>
                            <Close/>
                        </IconButton>
                    </td>
                    <td className="icon">
                        <IconButton disabled>
                            <AccountBox/>
                        </IconButton>
                    </td>
                </tr>

            );
        }else{
            return(
                <tr key={key} style={style} className="data-row-client">
                    <td>{clients[index].name}</td>
                    <td>{clients[index].lastname}</td>
                    <td>{clients[index].code}</td>
                    <td>{clients[index].status}</td>
                    <td className="icon">
                        <IconButton onClick={() => openEditTablesIndex(index)}>
                            <Create/>
                        </IconButton>
                    </td>
                    <td className="icon">
                        <IconButton onClick={() => deleteTablesIndex()}>
                            <Delete/>
                        </IconButton>
                    </td>
                    <td className="icon">
                        <IconButton onClick={() => getDataAndOpenModal(index)}>
                            <AccountBox/>
                        </IconButton>
                    </td>
                </tr>
            )
        }
    }

    return(
        <div className="container-visualize">

            <div className="search-container">
                <input className="input-name" type="text" placeholder="Nome do cliente" value={nameSearch} onChange={e => searchByName(e.target.value)}/>
                <input className="input-code" type="text" placeholder="Código do cliente" value={codeSearch} onChange={e => searchByCode(e.target.value)}/>
            </div>

            <div className="table-container">
                <table className="table-clients">
                    <thead>
                        <tr className="header-table-client">
                            <th>Nome</th>
                            <th>Sobrenome</th>
                            <th>Código</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                </table>
                <AutoSizer>
                    {({height, width}) => (
                        <List
                        width={width}
                        height={400}
                        rowCount={clients.length}
                        rowHeight={50}
                        rowRenderer={renderList}
                    />
                    )}
                </AutoSizer>
            </div>
            {openModal()}
        </div>
    );

}