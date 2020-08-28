import React, {useState, useEffect, useContext} from 'react'
import {Create, Delete, Done, Close, VpnKey} from '@material-ui/icons'
import {IconButton} from '@material-ui/core'
import {AutoSizer, List} from 'react-virtualized';
import StoreContext from '../../../../store/Context'
import api from '../../../../../services/api';
import Modal from '../Modal'


import './visualize.css'

export default () => {

    const {tokenAdmin} = useContext(StoreContext);
    const [modal, setModal] = useState(false);
    const [cnpjSearch, setCNPJSearch] = useState('');
    const [nameSearch, setNameSearch] = useState('');
    const [partners, setPartners] = useState('');
    const [partnersBase, setPartnersBase] = useState('');

    const [indexTableEdit, setIndexTableEdit] = useState('');
    const [indexChangePass, setIndexChangePass] = useState('');
    const [password, setPassword] = useState('');
    const [nameEditable, setNameEditable] = useState('');
    const [emailEditable, setEmailEditable] = useState('');
    const [companyEditable, setCompanyEditable] = useState('');
    const [cnpjEditable, setCnpjEditable] = useState('');
    const [rgEditable, setRgEditable] = useState('');
    const [cpfEditable, setCpfEditable] = useState('');

    const token = JSON.parse(tokenAdmin());

    useEffect(() => {
        api.defaults.headers.Authorization = `Bearer ${token}`;
        api.get('/partners').then(response =>{
            setPartners(response.data);
            setPartnersBase(response.data)
        })
    }, [])

    async function confirmEdit(){
        api.defaults.headers.Authorization = `Bearer ${token}`;
        try{
            await api.put(`/partners/${partners[indexTableEdit].id}`, {"email": emailEditable, "name": nameEditable, "company_name": companyEditable, "rg": rgEditable, "cpf": cpfEditable, "cnpj": cnpjEditable})

            cancelEdit();
            window.location.reload();
        }catch(err){
            alert('Falha na tentativa de editar parceiro');
        }
    }

    async function changePassword(){
        api.defaults.headers.Authorization = `Bearer ${token}`;
        try{
            await api.put(`/partners/password/${partners[indexChangePass].id}`, {"password": password})
            alert('Senha atualizada com sucesso!')
            setModal(false);
        }catch(err){
            alert('Erro ao mudar a senha, tente novamente');
        }
    }

    function getIndexChangePass(index){
        setIndexChangePass(index);
        setModal(true)
    }

    function openEditTablesIndex(index){
        setIndexTableEdit(index);
        setNameEditable(partners[index].name);
        setEmailEditable(partners[index].email);
        setCompanyEditable(partners[index].company_name);
        setCnpjEditable(partners[index].cnpj);
        setRgEditable(partners[index].rg);
        setCpfEditable(partners[index].cpf);
    }

    function cancelEdit(){
        setIndexTableEdit('');
        setNameEditable('');
        setEmailEditable('');
        setCompanyEditable('');
        setCnpjEditable('');
        setRgEditable('');
        setCpfEditable('');
    }

    function openModal(){
        if(modal){
            return(
                <Modal stateModal={modal} setStateModal={(bool) => setModal(bool)} partner={false} changePassword={true} password = {password} setPassword= {setPassword} changePasswordFunc={() => changePassword()}/>
            )
        }
    }

    async function deleteTablesIndex(index){
        api.defaults.headers.Authorization = `Bearer ${token}`;
        try{
            await api.delete(`/partners/${partners[index].id}`)
            window.location.reload();
        }catch(err){
            alert('Erro ao tentar excluir parceiro');
        }
    }

    function searchByCnpj(passedCnpjForSearch){
        setIndexTableEdit('');
        setNameEditable('');
        setCNPJSearch(passedCnpjForSearch);

        if(nameSearch === '' && passedCnpjForSearch === ''){
            setPartners(partnersBase);
        }else if(passedCnpjForSearch !== '' && nameSearch !== ''){
            setPartners(partnersBase.filter((partner) => partner.cnpj === passedCnpjForSearch && partner.name === nameSearch));
        }else if(passedCnpjForSearch === '' && nameSearch !== ''){
            setPartners(partnersBase.filter((partner) => partner.name === nameSearch));
        }else{
            setPartners(partnersBase.filter((partner) => partner.cnpj === passedCnpjForSearch));
        }

    }

    function searchByName(passedNameForSearch){
        setIndexTableEdit('');
        setNameEditable('');
        setNameSearch(passedNameForSearch);

        if(passedNameForSearch === '' && cnpjSearch === ''){
            setPartners(partnersBase);
        }else if(passedNameForSearch !== '' && cnpjSearch !== ''){
            setPartners(partnersBase.filter((partner) => partner.name === passedNameForSearch && partner.cnpj === cnpjSearch));
        }else if(passedNameForSearch === '' && cnpjSearch !== ''){
            setPartners(partnersBase.filter((partner) => partner.cnpj === cnpjSearch));
        }else{
            setPartners(partnersBase.filter((partner) => partner.name === passedNameForSearch));
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
                <tr key={key} style={style} className="data-row-partner">
                    <td><input className="input-edit-row"type="text"  value={nameEditable} onChange={e => setNameEditable(e.target.value)}></input></td>
                    <td><input className="input-edit-row"type="text"  value={emailEditable} onChange={e => setEmailEditable(e.target.value)}></input></td>
                    <td><input className="input-edit-row"type="text"  value={companyEditable} onChange={e => setCompanyEditable(e.target.value)}></input></td>
                    <td><input className="input-edit-row"type="text"  value={cnpjEditable} onChange={e => setCnpjEditable(e.target.value)}></input></td>
                    <td><input className="input-edit-row"type="text"  value={rgEditable} onChange={e => setRgEditable(e.target.value)}></input></td>
                    <td><input className="input-edit-row"type="text"  value={cpfEditable} onChange={e => setCpfEditable(e.target.value)}></input></td>

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
                        <IconButton onClick={() => getIndexChangePass(index)}>
                            <VpnKey/>
                        </IconButton>
                    </td>
                </tr>
            );
        }else{
            return(
                <tr key={key} style={style} className="data-row-partner">
                    <td>{partners[index].name}</td>
                    <td>{partners[index].email}</td>
                    <td>{partners[index].company_name}</td>
                    <td>{partners[index].cnpj}</td>
                    <td>{partners[index].rg}</td>
                    <td>{partners[index].cpf}</td>
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
                        <IconButton onClick={() => getIndexChangePass(index)}>
                            <VpnKey/>
                        </IconButton>
                    </td>
                </tr>
            )
        }
    }

    return(
        <div className="container-visualize">

            <div className="search-container">
                <input className="input-name" type="text" placeholder="Nome do parceiro" value={nameSearch} onChange={e => searchByName(e.target.value)}/>
                <input className="input-code" type="text" placeholder="CNPJ" value={cnpjSearch} onChange={e => searchByCnpj(e.target.value)}/>
            </div>

            <div className="table-container">
                <table className="table-partner">
                    <thead>
                        <tr className="header-table-partner">
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Empresa</th>
                            <th>CNPJ</th>
                            <th>RG</th>
                            <th>CPF</th>
                        </tr>
                    </thead>
                </table>
                <AutoSizer>
                    {({height, width}) => (
                        <List
                        width={width}
                        height={400}
                        rowCount={partners.length}
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