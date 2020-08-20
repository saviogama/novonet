import React, {useState} from 'react';
import Context from './Context';

export default ({children}) =>{

    const tokenAdmin = localStorage.getItem('tokenAdmin');
    const setTokenAdmin = (token) => localStorage.setItem('tokenAdmin', token);
    const removeTokenAdmin = () => localStorage.removeItem('tokenAdmin');

    const tokenClient = localStorage.getItem('tokenClient');
    const setTokenClient = (token) => localStorage.setItem('tokenClient', token);
    const removeTokenClient = () => localStorage.removeItem('tokenClient');

    const tokenPartner = localStorage.getItem('tokenPartner');
    const setTokenPartner = (token) => localStorage.setItem('tokenPartner', token);
    const removeTokenPartner = () => localStorage.removeItem('tokenPartnern');

    return(
        <Context.Provider value={{tokenAdmin, setTokenAdmin, removeTokenAdmin, tokenClient, setTokenClient, removeTokenClient, tokenPartner, setTokenPartner, removeTokenPartner}}>
            {children}
        </Context.Provider>
    );
};
