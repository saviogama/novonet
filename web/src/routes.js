import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import PrivateRouteAdmin from './components/privateRoutes/RouteAdmin' 
import PrivateRouteClient from './components/privateRoutes/RouteClient' 
import PrivateRoutePartner from './components/privateRoutes/RoutePartner'
import StoreProvider from './components/store/Provider'
import Login from './components/pages/login';
import Admin from './components/pages/admin';
import Client from './components/pages/client'
import Partner from './components/pages/partner'
import RegisterAdmin from './components/pages/registerAdmin'


export default () =>
    <BrowserRouter>
        <StoreProvider>
            <Switch>
                <Route path="/" exact component={Login}/>
                <PrivateRouteAdmin path="/admin" component={Admin}/>
                <PrivateRouteClient path="/cliente" component={Client}/>
                <PrivateRoutePartner path="/parceiro" component={Partner}/>
                <Route path="/registrar-admin" component={RegisterAdmin}/>
            </Switch>
        </StoreProvider>
    </BrowserRouter>