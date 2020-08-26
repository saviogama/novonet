import React from 'react';
import {useHistory} from 'react-router-dom';
import Context from './Context';

export default ({children}) =>{

    const history = useHistory();

    const tokenAdmin = () => localStorage.getItem('tokenAdmin');
    const setTokenAdmin = (token) => localStorage.setItem('tokenAdmin', JSON.stringify(token));

    const tokenClient = () => localStorage.getItem('tokenClient');
    const setTokenClient = (token) => localStorage.setItem('tokenClient', JSON.stringify(token));

    const tokenPartner = () => localStorage.getItem('tokenPartner');
    const setTokenPartner = (token) => localStorage.setItem('tokenPartner', JSON.stringify(token));

    const signOut = () => {
        localStorage.clear();
        history.push('/');
    }

    return(
        <Context.Provider value={{tokenAdmin, setTokenAdmin, tokenClient, setTokenClient, tokenPartner, setTokenPartner, signOut}}>
            {children}
        </Context.Provider>
    );
};
