import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Drawer from './components/drawer';
import Dashboard from './components/dashboard';
import Clients from './components/client/visualize';
import RegisterClient from './components/client/register';
import Partners from './components/partner/visualize'
import RegisterPartner from './components/partner/register'

export default () => {
    return(
        <BrowserRouter>
            <Switch>
                <Drawer>
                    <Route path="/admin" exact component={Dashboard}/>
                    <Route path="/admin/clientes" exact component={Clients}/>
                    <Route path="/admin/registrar_cliente" component={RegisterClient}/>
                    <Route path="/admin/parceiros" component={Partners}/>
                    <Route path="/admin/registrar_parceiro" component={RegisterPartner}/>
                </Drawer>
            </Switch>
        </BrowserRouter>
    );
}