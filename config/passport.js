const LocalStrategy = require('passport-local').Strategy;
const dbUtils = require('../utils/dbUtils.js');


function configurePassport(passport){

  passport.use(new LocalStrategy({
    usernameField: 'user[userName]',
    passwordField:'user[password]'
  }, (email, pass, done) => {
    //it check users and password separately, it cause some bug in authentication
    dbUtils.filter('users', 'email', email, (err, res)=> {
      if (err) return done(err);
      if (res.length == 0) return done(false, null, {message: 'username not found'});

      dbUtils.authorizePass(email, pass, (res, err)=> {
        if (res.rows.length == 0) return done(false, null, {message: 'pass word incorrect'});
        done(false, res.rows[0]);
      })
    })

  }));


  passport.serializeUser((user, done)=> {
    done(null, user.id);
  });


  passport.deserializeUser((id, done)=> {
    dbUtils.getItem('users', 'id', id, (res, err)=> {
        done(err, res.rows[0]);
    })
  })
}

module.exports = configurePassport ;
