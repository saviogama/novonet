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

    const [partnersTotal, setPartnersTotal] = useState('');
    const {tokenAdmin} = useContext(StoreContext);
    const token = tokenAdmin();

    useEffect(() => {
        api.defaults.headers.Authorization = `Bearer ${token}`
        api.get('/admin/users').then(response => {
            setClientsTotal(response.data.clients);
            setPartnersTotal(response.data.partners);
        })

        api.get('/admin/status-users').then(response => {
            setClientsActives(response.data.clientsAtivos);
            setClientsInactives(response.data.clientsInativos)
        })
    }, [setClientsTotal, setPartnersTotal, setClientsActives, setClientsInactives])

    const data = [
        { name: 'Clientes Ativos', value: clientsActives, color: '#FFFFFF' }, { name: 'Clientes Inativos', value: clientsInactives, color: '#000000' },
    ];

    const colors = ['#75cfaa', '#e04b89'];
      
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
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="numbers">
                            <div className="total-number">
                                <h2>Total: {clientsTotal}</h2>
                                <SupervisorAccount/>
                            </div>
                            <div className="total-actives">
                                <h2>Ativos: {clientsActives}</h2>
                                <SupervisorAccount/>
                            </div>
                            <div className="total-inactives">
                                <h2>Inativo: {clientsInactives}</h2>
                                <SupervisorAccount/>
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
                <h2>Parceiros</h2>
                <div className="total-partners">
                </div>
            </div>
        </div>
    );
}