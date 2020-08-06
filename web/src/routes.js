import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Login from './pages/login';
import Admin from './pages/admin';


export default () =>
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Login}/>
            <Route path="/admin" component={Admin}/>
        </Switch>
    </BrowserRouter>