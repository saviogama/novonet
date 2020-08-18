import React, {useState} from 'react'
import {Create, Delete, Done, Close} from '@material-ui/icons'
import {IconButton} from '@material-ui/core'
import {AutoSizer, List} from 'react-virtualized';

import './visualize.css'

export default () => {
    const parceiros = [];

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

    function renderFullList({
        key, // Unique key within array of rows
        index, // Index of row within collection
        isScrolling, // The List is currently being scrolled
        isVisible, // This row is visible within the List (eg it is not an overscanned row)
        style, // Style object to be applied to row (to position it)
    }) {
        return (
            <tr key={index} style={style} className="data-row-partner">
                <td>{partners[index].nome}</td>
                <td>{partners[index].email}</td>
                <td>{partners[index].CNPJ}</td>
                <td>{partners[index].endereco}</td>
                <td>{partners[index].telefone}</td>
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
                <tr key={key} style={style} className="data-row-partner">
                    <td><input className="input-edit-row"type="text"  value={nameEditable} onChange={e => setNameEditable(e.target.value)}></input></td>
                    <td>{partners[index].email}</td>
                    <td>{partners[index].CNPJ}</td>
                    <td>{partners[index].endereco}</td>
                    <td>{partners[index].telefone}</td>

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
                    <td>{partners[index].CNPJ}</td>
                    <td>{partners[index].endereco}</td>
                    <td>{partners[index].telefone}</td>
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
                    <input className="input-name" type="text" placeholder="Nome do parceiro" value={nameSearch} onChange={e => searchByName(e.target.value)}/>
                    <input className="input-code" type="text" placeholder="CNPJ" value={cnpjSearch} onChange={e => searchByCnpj(e.target.value)}/>
                </div>
    
                <div className="table-container">
                    <table className="table-partner">
                        <thead>
                            <tr className="header-table-partner">
                                <th>Nome</th>
                                <th>Email</th>
                                <th>CNPJ</th>
                                <th>Endereço</th>
                                <th>Telefone</th>
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
                    <input className="input-name" type="text" placeholder="Nome do parceiro" value={nameSearch} onChange={e => searchByName(e.target.value)}/>
                    <input className="input-code" type="text" placeholder="CNPJ" value={cnpjSearch} onChange={e => searchByCnpj(e.target.value)}/>
                </div>
    
                <div className="table-container">
                    <table className="table-partner">
                        <thead>
                            <tr className="header-table-partner">
                                <th>Nome</th>
                                <th>Email</th>
                                <th>CNPJ</th>
                                <th>Endereço</th>
                                <th>Telefone</th>
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
                            rowRenderer={renderListWithEditRow}
                        />
                        )}
                    </AutoSizer>  
                </div>
            </div>
        );
    }
    
    
}