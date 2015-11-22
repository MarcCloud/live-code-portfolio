import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import methodOverride from 'method-override';
import mongoose from 'mongoose';
import passport from './passport';
import { resolve } from 'path';
import authentication from './authentication.js';
import {MONGO} from '../conf';
import {router as routeModels} from './api';
import routes from '../app/routes/router';

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

    app.set('views', resolve(__dirname + '/views'));
    app.set('view engine', 'jade');
    app.use(express.static(resolve('./dist')));
    app.use(routeModels);
    app.use('/auth', authentication);

    app.get('/', (req, res)=>{
        res.render('signin');
    });

    app.get('/logout', (req, res)=>{
        req.logout();
        res.redirect('/');
    });

    app.get('/:user', (req, res)=>{
        res.send(routes.routeRequest(req));
    });

    const server = app.listen(process.env.PORT || 3000, ()=>{
        console.log('App running on port 3000');
    });
    return server;
}

