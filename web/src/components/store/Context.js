import {createContext} from 'react'

const storeContext = createContext({
    tokenAdmin: null,
    setTokenAdmin: () => {},
    removeTokenAdmin: () => {},

    tokenClient: null,
    setTokenClient: () => {},
    removeTokenClient: () => {},
    
    tokenPartner: null,
    setTokenPartner: () => {},
    removeTokenPartner: () => {},
});

export default storeContext;