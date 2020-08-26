import React, {useContext} from 'react'
import {Route, Redirect} from 'react-router-dom'
import Context from '../store/Context'

export default ({component: Component, ...rest}) => {

    const {tokenClient} = useContext(Context);

    return(
        <Route {...rest} render={()=> tokenClient() ? <Component {...rest}/> : <Redirect to="/"/> } />
    );
}