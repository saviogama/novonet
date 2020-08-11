import React, {useState} from 'react'
import {Create, Delete, Done, Close} from '@material-ui/icons'
import {IconButton} from '@material-ui/core'

import './visualize.css'

export default () => {
    const parceiros = [{
        nome:"Academia X",
        email:"X@hot.com",
        CNPJ:"00012145235",
        endereco:"São Paulo - SP",
        telefone:"99778899"
    },
    {
        nome:"Maria",
        email:"maria13@hot.com",
        CNPJ:"0001123545",
        endereco:"São Paulo - SP",
        telefone:"99778899"
    },
    {
        nome:"Marina do Carmo",
        email:"Mari@gmail.com",
        CNPJ:"0001216879",
        endereco:"São Paulo - SP",
        telefone:"99778899"
    },
    {
        nome:"Robson almeida",
        email:"robsonalmeida@bol.com",
        CNPJ:"552416213",
        endereco:"Recife - PE",
        telefone:"81 99665588"
    },
    ];

    const [cnpjSearch, setCNPJSearch] = useState('');
    const [nameSearch, setNameSearch] = useState('');
    const [partners, setPartners] = useState(parceiros);

    const [edit, setEdit] = useState(false);
    const [indexTableEdit, setIndexTableEdit] = useState('');
    const [nameEditable, setNameEditable] = useState('');

    function openEditTablesIndex(index){
        setEdit(true);
        setIndexTableEdit(index);
        setNameEditable(partners[index].nome);
    }

    function cancelEdit(){
        setEdit(false);
    }

    function deleteTablesIndex(){
        console.log('Delete');
    }

    function searchByCnpj(passedCnpjForSearch){
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

    if(!edit){
        return(
            <div className="container-visualize">
    
                <div className="search-container">
                    <input className="input-name" type="text" placeholder="Nome do parceiro" value={nameSearch} onChange={e => searchByName(e.target.value)}/>
                    <input className="input-code" type="text" placeholder="CNPJ" value={cnpjSearch} onChange={e => searchByCnpj(e.target.value)}/>
                </div>
    
                <div className="table-container">
                    <table className="table-clients">
                        <thead>
                            <tr className="header-table-partner">
                                <th>Nome</th>
                                <th>Email</th>
                                <th>CNPJ</th>
                                <th>Endereço</th>
                                <th>Telefone</th>
                            </tr>
                        </thead>
    
                        <tbody>
                            {
                                partners.map((partner, index) => (
                                    <tr key={index} className="data-row-partner">
                                        <td>{partner.nome}</td>
                                        <td>{partner.email}</td>
                                        <td>{partner.CNPJ}</td>
                                        <td>{partner.endereco}</td>
                                        <td>{partner.telefone}</td>
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
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }else{
        return(
            <div className="container-visualize">
    
                <div className="search-container">
                    <input className="input-name" type="text" placeholder="Nome do parceiro" value={nameSearch} onChange={e => searchByName(e.target.value)}/>
                    <input className="input-code" type="text" placeholder="Código do parceiro" value={cnpjSearch} onChange={e => searchByCnpj(e.target.value)}/>
                </div>
    
                <div className="table-container">
                    <table className="table-clients">
                        <thead>
                            <tr className="header-table-partner">
                                <th>Nome</th>
                                <th>Email</th>
                                <th>CNPJ</th>
                                <th>Endereço</th>
                                <th>Telefone</th>
                            </tr>
                        </thead>
    
                        <tbody>
                            {
                                partners.map((partner, index) => {
                                    if(index === indexTableEdit){
                                        return(
                                            <tr key={index} className="data-row-partner">
                                                <td><input type="text"  value={nameEditable} onChange={e => setNameEditable(e.target.value)}></input></td>
                                                <td>{partner.email}</td>
                                                <td>{partner.CNPJ}</td>
                                                <td>{partner.endereco}</td>
                                                <td>{partner.telefone}</td>

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
                                            <tr key={index} className="data-row-partner">
                                                <td>{partner.nome}</td>
                                                <td>{partner.email}</td>
                                                <td>{partner.CNPJ}</td>
                                                <td>{partner.endereco}</td>
                                                <td>{partner.telefone}</td>
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
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
    
    
}