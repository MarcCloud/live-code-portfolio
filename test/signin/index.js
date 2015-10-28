import test from 'blue-tape';
import React from 'react';
import { renderToStaticMarkup as render } from 'react-dom/server';
import $ from 'cheerio';
import signinFact from '../../app/signin/view';

const signIn = signinFact(React);

test('Sign in should have a github button', expect =>{
    const form = render(signIn());
    const github = $('a', form);

    expect.equal(github.attr('href'), '/auth/github');
    expect.equal(github.children('img').attr('src'), '/images/github-logo.png');
    expect.end();

});
