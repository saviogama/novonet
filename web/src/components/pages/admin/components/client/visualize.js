import React, {useState, useEffect, useContext} from 'react'
import {Create, Delete, Done, Close, AccountBox} from '@material-ui/icons'
import {IconButton} from '@material-ui/core'
import {AutoSizer, List} from 'react-virtualized';
import StoreContext from '../../../../store/Context'
import Modal from '../Modal'

import './visualize.css'
import api from '../../../../../services/api';

export default () => {

    const {tokenAdmin} = useContext(StoreContext);

    const [clients, setClients] = useState('');
    const [clientsBase, setClientsBase] = useState('');
    const [codeSearch, setCodeSearch] = useState('');
    const [nameSearch, setNameSearch] = useState('');

    const [indexTableEdit, setIndexTableEdit] = useState('');
    const [nameEditable, setNameEditable] = useState('');
    const [lastNameEditable, setLastNameEditable] = useState('');
    const [emailEditable, setEmailEditable] = useState('');
    const [rgEditable, setRgEditable] = useState('');
    const [cpfEditable, setCpfEditable] = useState('');
    const [codeEditable, setCodeEditable] = useState('');
    const [statusEditable, setStatusEditable] = useState(false);

    const [modal, setModal] = useState(false);
    const [clientModal, setClientModal] = useState('');

    const token = JSON.parse(tokenAdmin());

    useEffect(() => {
        api.defaults.headers.Authorization = `Bearer ${token}`;
        api.get('/clients').then(response =>{
            setClients(response.data);
            setClientsBase(response.data)
        })
    }, [])

    function statusSelection(index){
        if(clients[index].status === true){
            return 'Ativo'
        }else{
            return 'Inativo'
        }
    }

    function getDataAndOpenModal(index){
        setClientModal(clients[index]);
        setModal(true);
    }

    function openModal(){
        if(modal){
            return(
                <Modal stateModal={modal} setStateModal={(bool) => setModal(bool)} modalProfile={clientModal} partner={false}/>
            )
        }
    }

    async function confirmEdit(){
        api.defaults.headers.Authorization = `Bearer ${token}`;
        try{
            console.log(clients[indexTableEdit].id)
            await api.put(`/clients/${clients[indexTableEdit].id}`, {"email": emailEditable, "firstname": nameEditable, "lastname": lastNameEditable, "rg": rgEditable, "cpf":cpfEditable, "status": statusEditable})

            cancelEdit();
            window.location.reload();
        }catch(err){
            alert('Falha na tentativa de editar cliente');
        }
    }

    function openEditTablesIndex(index){
        setIndexTableEdit(index);
        setNameEditable(clients[index].firstname);
        setLastNameEditable(clients[index].lastname);
        setEmailEditable(clients[index].email);
        setRgEditable(clients[index].rg);
        setCpfEditable(clients[index].cpf);
        setCodeEditable(clients[index].code);
        setStatusEditable(clients[index].status);
    }

    function cancelEdit(){
        setIndexTableEdit('');
        setNameEditable('');
        setLastNameEditable('');
        setEmailEditable('');
        setRgEditable('');
        setCpfEditable('');
        setCodeEditable('');
        setStatusEditable('');
    }

    async function deleteTablesIndex(index){
        api.defaults.headers.Authorization = `Bearer ${token}`;
        try{
            await api.delete(`/clients/${clients[index].id}`)
            window.location.reload();
        }catch(err){
            alert('Erro ao tentar excluir cliente');
        }
    }

    
    function searchByCode(codePassedForSearch){
        setIndexTableEdit('');
        setNameEditable('');

        setCodeSearch(codePassedForSearch);

        if(nameSearch === '' && codePassedForSearch === ''){
            setClients(clientsBase);
        }else if(codePassedForSearch !== '' && nameSearch !== ''){
            setClients(clientsBase.filter((client, index, array) => client.code === codePassedForSearch && client.firstname === nameSearch));
        }else if(codePassedForSearch === '' && nameSearch !== ''){
            console.log(nameSearch);
            setClients(clientsBase.filter((client, index, array) => client.firstname === nameSearch));
        }else{
            setClients(clientsBase.filter((client, index, array) => client.code === codePassedForSearch));
        }

    }

    function searchByName(namePassedForSearch){
        setIndexTableEdit('');
        setNameEditable('');

        setNameSearch(namePassedForSearch);

        if(namePassedForSearch === '' && codeSearch === ''){
            setClients(clientsBase);
        }else if(namePassedForSearch !== '' && codeSearch !== ''){
            setClients(clientsBase.filter((client, index, array) => client.firstname === namePassedForSearch && client.code === codeSearch));
        }else if(namePassedForSearch === '' && codeSearch !== ''){
            setClients(clientsBase.filter((client, index, array) => client.code === codeSearch));
        }else{
            setClients(clientsBase.filter((client, index, array) => client.firstname === namePassedForSearch));
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
                    <td><input className="input-edit-row"type="text"  value={lastNameEditable} onChange={e => setLastNameEditable(e.target.value)}></input></td>
                    <td><input className="input-edit-row"type="text"  value={emailEditable} onChange={e => setEmailEditable(e.target.value)}></input></td>
                    <td><input className="input-edit-row"type="text"  value={rgEditable} onChange={e => setRgEditable(e.target.value)}></input></td>
                    <td><input className="input-edit-row"type="text"  value={cpfEditable} onChange={e => setCpfEditable(e.target.value)}></input></td>
                    <td><input className="input-edit-row"type="text"  value={codeEditable} onChange={e => setCodeEditable(e.target.value)} disabled></input></td>
                    <td><select onChange={e => setStatusEditable(e.target.value)}>
                        <option></option>
                        <option value={true}>Ativo</option>
                        <option value={false}>Inativo</option>
                        </select></td>

                    <td className="icon">
                        <IconButton onClick={() => confirmEdit()}>
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
                    <td>{clients[index].firstname}</td>
                    <td>{clients[index].lastname}</td>
                    <td>{clients[index].email}</td>
                    <td>{clients[index].rg}</td>
                    <td>{clients[index].cpf}</td>
                    <td>{clients[index].code}</td>
                    <td>{statusSelection(index)}</td>
                    <td className="icon">
                        <IconButton onClick={() => openEditTablesIndex(index)}>
                            <Create/>
                        </IconButton>
                    </td>
                    <td className="icon">
                        <IconButton onClick={() => deleteTablesIndex(index)}>
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
                            <th>Email</th>
                            <th>RG</th>
                            <th>CPF</th>
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
                        rowHeight={70}
                        rowRenderer={renderList}
                    />
                    )}
                </AutoSizer>
            </div>
            {openModal()}
        </div>
    );

}