import Router from 'express';
import passport from './passport';
var router = Router();

router
    .route('/github')
    .get(passport.authenticate('github', { scope: ['user:email']}));

router
    .route('/github/callback')
    .get(passport.authenticate('github', { failureRedirect: '/'}), (req, res)=>{ res.redirect(`/${req.user._id}`);});

export default router;
