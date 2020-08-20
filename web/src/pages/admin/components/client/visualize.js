import React, {useState} from 'react'
import {Create, Delete, Done, Close} from '@material-ui/icons'
import {IconButton} from '@material-ui/core'
import {AutoSizer, List} from 'react-virtualized';

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
        nome:"Marcos da Fé",
        codigo:"666333",
        status:"Ativo",
    }];

    const [clients, setClients] = useState(clientes);
    const [codeSearch, setCodeSearch] = useState('');
    const [nameSearch, setNameSearch] = useState('');

    const [edit, setEdit] = useState(false);
    const [indexTableEdit, setIndexTableEdit] = useState('');
    const [nameEditable, setNameEditable] = useState('');

    function openEditTablesIndex(index){
        setEdit(true);
        setIndexTableEdit(index);
        setNameEditable(clients[index].nome);
    }

    function cancelEdit(){
        setEdit(false);
    }

    function deleteTablesIndex(){
        console.log('Delete');
    }

    function searchByCode(codePassedForSearch){
        setCodeSearch(codePassedForSearch);

        if(nameSearch === '' && codePassedForSearch === ''){
            setClients(clientes);
        }else if(codePassedForSearch !== '' && nameSearch !== ''){
            setClients(clientes.filter((client, index, array) => client.codigo === codePassedForSearch && client.nome === nameSearch));
        }else if(codePassedForSearch === '' && nameSearch !== ''){
            console.log(nameSearch);
            setClients(clientes.filter((client, index, array) => client.nome === nameSearch));
        }else{
            setClients(clientes.filter((client, index, array) => client.codigo === codePassedForSearch));
        }

    }

    function searchByName(namePassedForSearch){
        setNameSearch(namePassedForSearch);

        if(namePassedForSearch === '' && codeSearch === ''){
            setClients(clientes);
        }else if(namePassedForSearch !== '' && codeSearch !== ''){
            setClients(clientes.filter((client, index, array) => client.nome === namePassedForSearch && client.codigo === codeSearch));
        }else if(namePassedForSearch === '' && codeSearch !== ''){
            setClients(clientes.filter((client, index, array) => client.codigo === codeSearch));
        }else{
            setClients(clientes.filter((client, index, array) => client.nome === namePassedForSearch));
        }
    }

    function renderFullList({
        key, // Unique key within array of rows
        index, // Index of row within collection
        isScrolling, // The List is currently being scrolled
        isVisible, // This row is visible within the List (eg it is not an overscanned row)
        style, // Style object to be applied to row (to position it)
    }) {
        return (
            <tr key={index} style={style} className="data-row-client">
                <td>{clients[index].nome}</td>
                <td>{clients[index].codigo}</td>
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
            </tr>
        );
    }

    
    function renderListWithEditRow({
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
                    <td>{clients[index].codigo}</td>
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
                </tr>
            );
        }else{
            return(
                <tr key={key} style={style} className="data-row-client">
                    <td>{clients[index].nome}</td>
                    <td>{clients[index].codigo}</td>
                    <td>{clients[index].status}</td>
                    <td className="icon">
                        <IconButton onClick={() => openEditTablesIndex(index)}>
                            <Create/>
                        </IconButton>
                    </td>
                    <td className="icon">
                        <IconButton>
                            <Delete/>
                        </IconButton>
                    </td>
                </tr>
            )
        }
    }





    if(!edit){
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
                            rowRenderer={renderFullList}
                        />
                        )}
                    </AutoSizer>
                </div>
            </div>
        );
    }else{
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
                            rowRenderer={renderListWithEditRow}
                        />
                        )}
                    </AutoSizer>  
                </div>
            </div>
        );
    }
    
    
}