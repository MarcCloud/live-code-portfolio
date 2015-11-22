import test from 'blue-tape';
import React from 'react';
import $ from 'cheerio';
import personaFactory from './index';

const persona = personaFactory(React);

test('Persona should have a picture, name, and bio', expect=>{
    const props = {name: 'MyName', bio: 'shoert suff', picture: '/picture.png'};
    const html = React.renderToStaticMarkup(persona(props));

    const name = $('.persona .name', html).text();
    const bio = $('.persona .bio', html).text();
    const picture = $('.persona .picture', html).attr('src');
    expect.equal(name, props.name);
    expect.equal(bio, props.bio);
    expect.equal(picture, props.picture);

    expect.end();
});
