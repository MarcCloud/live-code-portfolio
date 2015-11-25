import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';
import R from 'ramda';
import {users} from './api';
import conf from '../conf';

passport.serializeUser((user, done)=> {
    done(null, user);
});

passport.deserializeUser((user, done)=> {
    done(null, user);
});


passport.use(new GitHubStrategy({
        clientID: conf.GITHUB_CLIENT,
        clientSecret: conf.GITHUB_SECRET,
        callbackURL: 'http://0.0.0.0:3000/auth/github/callback'
    },
    (accessToken, _, user, done) =>{
        users.retrieve(user.id, (error, doc)=>{
            console.log(doc);
            if (!doc){
                users.create(R.merge(user._json, {_id: user.id, token: accessToken, email: user.emails[0].value}))
                    .then(usr=>{
                        done(null, usr);
                    }, er=>console.log(er));
            }
            return done(null, doc);
        });
    }
));

export default passport;
