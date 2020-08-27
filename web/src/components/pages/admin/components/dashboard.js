import React, {useState,useContext, useEffect} from 'react'
import {useHistory} from 'react-router-dom';
import {PieChart, Pie, Tooltip, ResponsiveContainer, Cell} from 'recharts';
import StoreContext from '../../../store/Context'
import {SupervisorAccount} from '@material-ui/icons'
import api from '../../../../services/api';
import './dashboad.css'

export default () => {
    const history = useHistory();

    const [clientsTotal, setClientsTotal] = useState('');
    const [clientsActives, setClientsActives] = useState('');
    const [clientsInactives, setClientsInactives] = useState('');
    const [totalUsers, setTotalUsers] = useState('');
    const [partnersTotal, setPartnersTotal] = useState('');
    const {tokenAdmin} = useContext(StoreContext);
    const token = JSON.parse(tokenAdmin());

    useEffect(() => {
        api.defaults.headers.Authorization = `Bearer ${token}`
        api.get('/admin/users').then(response => {
            setClientsTotal(response.data.clients);
            setPartnersTotal(response.data.partners);
            setTotalUsers(response.data.clients + response.data.partners);
        })

        api.get('/admin/status-users').then(response => {
            setClientsActives(response.data.clientsAtivos);
            setClientsInactives(response.data.clientsInativos)
        })
    }, [setClientsTotal, setPartnersTotal, setClientsActives, setClientsInactives])

    const data = [
        {name:'Parceiros', value: partnersTotal},{name: 'Clientes Ativos', value: clientsActives }, { name: 'Clientes Inativos', value: clientsInactives},
    ];

    const colors = ['#e4ff00', '#75cfaa', '#e04b89'];
      
    function handleQuickAction(type){
        if(type === 1){
            history.push('/admin/clientes');
        }else if(type === 2){
            history.push('/admin/registrar_cliente');
        }else if(type === 3){
            history.push('/admin/parceiros');
        }else{
            history.push('/admin/registrar_parceiro');
        }
    }

    return(
        <div className="container-dashboard">
            <div className="client-data">
                <div className="titles-dashboard">
                    <h2 id="title-clients">Clientes</h2>
                    <h2 id="title-actions">Ações Rápidas</h2>
                </div>
                <div className="client-fields">
                    <div className="total-clients">
                        <ResponsiveContainer width="60%" height="100%">
                            <PieChart >
                                <Pie dataKey="value" isAnimationActive={false} data={data} outerRadius={80} innerRadius={40} fill="#9B111E">
                                    <Cell key={`cell-${0}`} fill={colors[0]} />
                                    <Cell key={`cell-${1}`} fill={colors[1]} />
                                    <Cell key={`cell-${2}`} fill={colors[2]} />
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="numbers">
                            <div className="users-number">
                                <h2>Usuários: {totalUsers}</h2>
                            </div>
                            <div className="client-number">
                                <h2>Clientes: {clientsTotal}</h2>
                            </div>
                            <div className="partner-number">
                                <h2>Parceiros: {partnersTotal}</h2>
                            </div>
                        </div>
                    </div>

                    <div className="quick-actions">
                        <div className="buttons-client">
                            <button className="button" id="button" onClick={() => handleQuickAction(2)}>Cadastrar cliente</button>
                            <button className="button" id="button" onClick={() => handleQuickAction(4)}>Cadastrar parceiro</button>
                        </div>
                        <div className="buttons-partner">
                            <button className="button" id="button" onClick={() => handleQuickAction(1)}>Vizualizar clientes</button>
                            <button className="button" id="button" onClick={() => handleQuickAction(3)}>Vizualizar parceiros</button>
                        </div>
                    </div>
                </div>

            </div>
            <div className="partner-data">
                <div className="total-partners">
                </div>
            </div>
        </div>
    );
}