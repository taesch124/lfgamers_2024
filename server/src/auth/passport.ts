import { Express } from 'express';
import passport from 'passport';
import passportLocal from 'passport-local';

passport.use(new passportLocal.Strategy((username, password, done) => {
    console.log("passport local", username, password);
    return done(null, { id: 1, username: 'sam' });
}));

export const initialize: (app: Express) => void = () => {

}