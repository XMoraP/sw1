const express = require('express');
const router = express.Router();
const users = require('../users'); // Suponiendo que tienes un módulo para manejar usuarios

router.get('/', function(req, res, next) {
    res.render('register', { title: 'Register', user: req.session.user });
  });
  
  router.post('/', function(req, res, next) {
    const username = req.body.user;
    const password = req.body.pass;
    const confirmPass = req.body.confirmPass;
  
    if (password !== confirmPass) {
      req.session.error = 'Las contraseñas no coinciden';
      res.redirect("/register");
    } else if (password.length < 8) {
      req.session.error = 'La contraseña debe tener al menos 8 caracteres';
      res.redirect("/register");
    } else if (users[username]) {
      req.session.error = 'El usuario ya existe';
      res.redirect("/register");
    } else {
        users.register(username, password, function(){
            req.session.user = users[username];
            req.session.message = "Usuario registrado exitosamente!";
            res.redirect("/restricted");
          });
    }
  });

module.exports = router;
