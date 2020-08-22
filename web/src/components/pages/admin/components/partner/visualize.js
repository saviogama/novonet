import React, {useState} from 'react'
import {Create, Delete, Done, Close} from '@material-ui/icons'
import {IconButton} from '@material-ui/core'
import {AutoSizer, List} from 'react-virtualized';

import './visualize.css'

export default () => {
    const parceiros = [{
        nome:"João",
        email:"joão@joão.com",
        company: "Academia Fit",
        CNPJ:"0012130",
        rg: "9.095.482",
        cpf: "120.425.142-90"
    },
    {
        nome:"Maria Aparecida",
        email:"mari@bol.com",
        company: "Atacado Souza",
        CNPJ:"001255012",
        rg: "2.105.132",
        cpf: "130.454.032-25"
    },
    {
        nome:"Rodrigo",
        email:"ro@hotmail.com",
        company: "Centro Informática",
        CNPJ:"001202150",
        rg: "9.095.482",
        cpf: "120.358.152-90"
    }];

    const [cnpjSearch, setCNPJSearch] = useState('');
    const [nameSearch, setNameSearch] = useState('');
    const [partners, setPartners] = useState(parceiros);

    const [indexTableEdit, setIndexTableEdit] = useState('');
    const [nameEditable, setNameEditable] = useState('');

    function openEditTablesIndex(index){
        setIndexTableEdit(index);
        setNameEditable(partners[index].nome);
    }

    function cancelEdit(){
        setIndexTableEdit('');
        setNameEditable('');
    }

    function deleteTablesIndex(){
        console.log('Delete');
    }

    function searchByCnpj(passedCnpjForSearch){
        setIndexTableEdit('');
        setNameEditable('');
        setCNPJSearch(passedCnpjForSearch);

        if(nameSearch === '' && passedCnpjForSearch === ''){
            setPartners(parceiros);
        }else if(passedCnpjForSearch !== '' && nameSearch !== ''){
            setPartners(parceiros.filter((partners) => partners.CNPJ === passedCnpjForSearch && partners.nome === nameSearch));
        }else if(passedCnpjForSearch === '' && nameSearch !== ''){
            console.log(nameSearch);
            setPartners(parceiros.filter((partners) => partners.nome === nameSearch));
        }else{
            setPartners(parceiros.filter((partners) => partners.CNPJ === passedCnpjForSearch));
        }

    }

    function searchByName(passedNameForSearch){
        setIndexTableEdit('');
        setNameEditable('');
        setNameSearch(passedNameForSearch);

        if(passedNameForSearch === '' && cnpjSearch === ''){
            setPartners(parceiros);
        }else if(passedNameForSearch !== '' && cnpjSearch !== ''){
            setPartners(parceiros.filter((partners) => partners.nome === passedNameForSearch && partners.CNPJ === cnpjSearch));
        }else if(passedNameForSearch === '' && cnpjSearch !== ''){
            setPartners(parceiros.filter((partners) => partners.CNPJ === cnpjSearch));
        }else{
            setPartners(parceiros.filter((partners) => partners.nome === passedNameForSearch));
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
                    <td>{partners[index].email}</td>
                    <td>{partners[index].company}</td>
                    <td>{partners[index].CNPJ}</td>
                    <td>{partners[index].rg}</td>
                    <td>{partners[index].cpf}</td>

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
                <tr key={key} style={style} className="data-row-partner">
                    <td>{partners[index].nome}</td>
                    <td>{partners[index].email}</td>
                    <td>{partners[index].company}</td>
                    <td>{partners[index].CNPJ}</td>
                    <td>{partners[index].rg}</td>
                    <td>{partners[index].cpf}</td>
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
                        rowHeight={50}
                        rowRenderer={renderList}
                    />
                    )}
                </AutoSizer>
            </div>
        </div>
    );
}