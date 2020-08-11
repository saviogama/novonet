import React from 'react'
import './styles.css';

export default () => {
    return(
        <div className="container-partner">
            <div className="container-search">
                <input type="text" placeholder="Código do cliente" className="input-code" id="partner"/>
                <button className="button" id="button_partner">Buscar</button>
            </div>
            <div className="container-result">

            </div>
        </div>
    );
}