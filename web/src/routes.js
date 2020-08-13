import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Login from './pages/login';
import Admin from './pages/admin';
import Cliente from './pages/client'


export default () =>
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Login}/>
            <Route path="/admin" component={Admin}/>
            <Route path="/cliente" component={Cliente}/>
        </Switch>
    </BrowserRouter>