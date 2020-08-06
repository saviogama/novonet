import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Drawer from './components/dashboard'
import Dashboard from './components/drawer'
import Clientes from './components/clientes'

export default () => {
    return(
        <BrowserRouter>
            <Switch>
                <Drawer>
                    <Route path="/admin" exact component={Dashboard}/>
                    <Route path="/admin/clientes" exact component={Clientes}/>
                </Drawer>
            </Switch>
        </BrowserRouter>
    );
}