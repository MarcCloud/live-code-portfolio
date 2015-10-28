import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';

import conf from '../conf';

passport.serializeUser((user, done)=> {
    done(null, user);
});

passport.deserializeUser((obj, done)=> {
    done(null, obj);
});


passport.use(new GitHubStrategy({
        clientID: conf.GITHUB_CLIENT,
        clientSecret: conf.GITHUB_SECRET,
        callbackURL: 'http://0.0.0.0:3000/auth/github/callback'
    },
    (accessToken, refreshToken, profile, done) =>{
        process.nextTick(()=> {done(null, profile);});
    }
));

export default passport;
