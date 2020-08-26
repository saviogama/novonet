import React, {useContext} from 'react'
import {Route, Redirect} from 'react-router-dom'
import Context from '../store/Context'

export default ({component: Component, ...rest}) => {

    const {tokenAdmin} = useContext(Context);

    return(
        <Route {...rest} render={()=> tokenAdmin() ? <Component {...rest}/> : <Redirect to="/"/> } />
    );
}