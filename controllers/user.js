const app = require('express')();
const User = require('../models/user');

app.post('/user', (req, res) => {
  const { username, password } = req.body;

  let user = new User({ username, password });

  user.save((err, userDB) => {
    if(err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }

    // userDB.pass = null;
    res.json({
      ok: true,
      userDB,
    });
  });
});

module.exports = app;
