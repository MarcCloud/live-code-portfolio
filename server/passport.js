import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';
import R from 'ramda';
import profile from './api/users/profile';
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
        profile.retrieve(user.id).then((doc)=>{
            if (!doc){
                profile.create(R.merge(user._json, {_id: user.id, token: accessToken, email: user.emails[0].value}))
                    .then(done);
            }
            return done(null, doc);
        }).catch(done);
    }
));

export default passport;
