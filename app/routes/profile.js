import React from 'react';
import App from '../layout';
import personaFactory from '../persona';
import {users} from '../../server/api';
const persona = personaFactory(React);

export default (params, query)=>new Promise((resolve, reject)=>{
    users.retrieve(params.user, (err, profile)=>{
        const props = {name: profile.name, bio: profile.bio, picture: profile.avatar_url};
        resolve(<App>{persona(props)}</App>);
    });
});
