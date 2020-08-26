import React, {useContext} from 'react'
import {Route, Redirect} from 'react-router-dom'
import Context from '../store/Context'

export default ({component: Component, ...rest}) => {

    const {tokenPartner} = useContext(Context);

    return(
        <Route {...rest} render={()=> tokenPartner() ? <Component {...rest}/> : <Redirect to="/"/> } />
    );
}