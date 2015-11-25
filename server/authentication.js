import Router from 'express';
import passport from './passport';
var router = Router();

router
    .route('/github')
    .get(passport.authenticate('github', { scope: ['user:email']}));

router
    .route('/github/callback')
    .get(passport.authenticate('github', { failureRedirect: '/som'}),
        (req, res)=>{
            res.redirect(`/app/${req.user._id}`);
        });

export default router;
