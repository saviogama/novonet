import React, {useState, useContext} from 'react'
import Logo_Branco from '../../../assets/Logo_Branco.png'
import {useHistory} from 'react-router-dom';
import { makeStyles} from '@material-ui/core/styles'; 
import {Create, Delete, Done, Close} from '@material-ui/icons'
import {IconButton} from '@material-ui/core'; //Customization
import {ExitToApp} from '@material-ui/icons'
import {AutoSizer, List} from 'react-virtualized';
import StoreContext from '../../store/Context'
import './styles.css'


const useStyles = makeStyles((theme) => ({
    icons:{
        color:'#FFFFFF',
    },
}))




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

    const classes = useStyles();
    const history = useHistory();
    const {removeTokenPartner} = useContext(StoreContext);
    const [clients, setClients] = useState(clientes);
    const [codeSearch, setCodeSearch] = useState('');
    const [nameSearch, setNameSearch] = useState('');

    const [edit, setEdit] = useState(false);
    const [indexTableEdit, setIndexTableEdit] = useState('');
    const [nameEditable, setNameEditable] = useState('');

    function openEditTablesIndex(index){
        setEdit(true);
        setIndexTableEdit(index);
        setNameEditable(clients[index].name);
    }

    function cancelEdit(){
        setEdit(false);
    }

    function deleteTablesIndex(){
        console.log('Delete');
    }

    const exitFromTheSystem = () =>{
        removeTokenPartner();
        history.push('/');
    }

    function searchByCode(codePassedForSearch){
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

    function renderFullList({
        key, // Unique key within array of rows
        index, // Index of row within collection
        isScrolling, // The List is currently being scrolled
        isVisible, // This row is visible within the List (eg it is not an overscanned row)
        style, // Style object to be applied to row (to position it)
    }) {
        return (
            <tr key={index} style={style} className="data-row-client">
                <td>{clients[index].name}</td>
                <td>{clients[index].lastname}</td>
                <td>{clients[index].email}</td>
                <td>{clients[index].rg}</td>
                <td>{clients[index].cpf}</td>
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
                    <td>{clients[index].lastname}</td>
                    <td>{clients[index].email}</td>
                    <td>{clients[index].rg}</td>
                    <td>{clients[index].cpf}</td>
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
                </tr>
            );
        }else{
            return(
                <tr key={key} style={style} className="data-row-client">
                    <td>{clients[index].name}</td>
                    <td>{clients[index].lastname}</td>
                    <td>{clients[index].email}</td>
                    <td>{clients[index].rg}</td>
                    <td>{clients[index].cpf}</td>
                    <td>{clients[index].code}</td>
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
            <div className="container-partner">
                <header>
                    <img src={Logo_Branco} className="logo_header" alt="NovoNet"/>
                    <div className="exitButton-container">
                        <IconButton className={classes.icons} onClick={exitFromTheSystem}>
                            <ExitToApp fontSize="large"/>
                        </IconButton>
                    </div>
                </header>
                <main id="main-partner">
                    <div className="container-search">
                        <input type="text" placeholder="Nome do cliente" className="input" value={nameSearch} onChange={e => searchByName(e.target.value)}/>
                        <input type="text" placeholder="Código do cliente" className="input" value={codeSearch} onChange={e => searchByCode(e.target.value)}/>
                    </div>

                    <div className="container-result">
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
                                    rowHeight={50}
                                    rowRenderer={renderFullList}
                                />
                                )}
                            </AutoSizer>
                    </div>
                </main>
            </div>
        );
    }else{
        return(
            <div className="container-partner">
                <header>
                    <img src={Logo_Branco} className="logo_header" alt="NovoNet"/>
                    <div className="exitButton-container">
                        <IconButton className={classes.icons} onClick={exitFromTheSystem}>
                            <ExitToApp fontSize="large"/>
                        </IconButton>
                    </div>
                </header>
                <main id="main-partner">
                    <div className="container-search">
                        <input type="text" placeholder="Nome do cliente" className="input" disabled/>
                        <input type="text" placeholder="Código do cliente" className="input" disabled/>
                    </div>

                    <div className="container-result">
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
                                    rowHeight={50}
                                    rowRenderer={renderListWithEditRow}
                                />
                                )}
                            </AutoSizer>
                    </div>
                </main>
            </div>
        );
    }
}
