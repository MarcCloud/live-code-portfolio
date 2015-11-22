import React from 'react';
import App from '../layout';
import personaFactory from '../persona';
const persona = personaFactory(React);

export default (param, query)=>new Promise((resolve, reject)=>{
    const props = {name: param.user, bio: 'test', picture: '/pic.png'};
    resolve(<App>{persona(props)}</App>);
});
