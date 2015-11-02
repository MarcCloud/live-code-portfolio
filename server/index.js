import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import methodOverride from 'method-override';
import mongoose from 'mongoose';
import passport from './passport';
import { resolve } from 'path';
import authentication from './authentication.js';
import {MONGO} from '../conf';

const app = express();
const env = process.env.NODE_ENV || 'development';

export default function (){

    if (env === 'development'){
        const webpack = require('webpack');
        const config = require('../webpack.config.babel.js');
        const compiler = webpack(config);

        app.use(require('webpack-dev-middleware')(compiler, {
            noInfo: true,
            publicPath: config.output.publicPath
        }));
        console.log('Dev mode hot reload');
        app.use(require('webpack-hot-middleware')(compiler, {
            log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
        }));
    }

    mongoose.connect(MONGO.DB, { user: MONGO.USER, pass: MONGO.PWD});
    mongoose.connection
        .on('error', (err)=> { console.error(`Could not connect to database due: ${err}`);})
        .once('open', ()=> console.log('Success!!'));

    app.use(bodyParser());
    app.use(methodOverride());
    app.use(session({ secret: 'kowabonga' }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(express.static(resolve('./dist')));

    app.use('/auth', authentication);

    app.get('/', (req, res)=>{
        res.sendFile(resolve('./app/index.html'));
    });

    app.get('/api', (req, res)=>{
        res.json({ message: 'Hello from the API'});
    });

    app.get('/logout', (req, res)=>{
        req.logout();
        res.redirect('/');
    });

    app.get('/deck', (req, res)=>{
        console.log(req.isAuthenticated());
        res.send(req.user);
    });

    const server = app.listen(process.env.PORT || 3000, ()=>{
        console.log('App running on port 3000');
    });
    return server;
}

