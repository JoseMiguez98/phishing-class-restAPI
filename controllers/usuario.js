const app = require('express')();
const _ = require('lodash');
const Usuario = require('../models/usuario');

app.get('/usuario', (req, res) => {
  Usuario.find( (err, usuarios) => {
    if(err) {
      return res.status(500).json({
        ok: false,
        err: err.message,
      });
    }

    return res.json({
      ok: true,
      result: [...usuarios],
    })
  });
});

app.get('/usuario/:id', (req, res) => {
  const id = req.params.id;

  Usuario.findById(id, (err, usuarioDB) => {
    if(err) {
      return res.status(500).json({
        ok: false,
        err: err.message,
      });
    }

    if(!usuarioDB) {
      return res.status(404).json({
        ok: false,
        err: 'Usuario no encontrado',
      });
    }

    return res.json({
      ok: true,
      result: usuarioDB,
    })
  });
});

app.post('/usuario', (req, res) => {
  const {
    casado,
    direccion,
    email,
    nombreDeUsuario,
    password,
    telefono,
  } = req.body;

  console.log(req);

  let usuario = new Usuario({
    casado,
    direccion,
    email,
    nombreDeUsuario,
    password,
    telefono,
  });

  usuario.save((err, usuarioDB) => {
    if(err) {
      return res.status(400).json({
        ok: false,
        err: err.message,
      });
    }

    res.json({
      ok: true,
      result: usuarioDB,
    });
  });
});

app.put('/usuario/:id', (req, res) => {
  const id = req.params.id;
  const body = _.pick(req.body, [
    'casado',
    'direccion',
    'email',
    'nombreDeUsuario',
    'password',
    'telefono',
  ]);

  Usuario.findByIdAndUpdate(id, body, {
    context: 'query',
    new: true,
    runValidators: true,
  }, (err, usuarioDB) => {

    if(err) {
      return res.status(400).json({
        ok: false,
        err: err.message,
      });
    }

    if(!usuarioDB) {
      return res.status(404).json({
        ok: false,
        err: 'Usuario no encontrado',
      });
    }

    return res.json({
      ok: true,
      result: usuarioDB,
    });
  })
});

app.delete('/usuario/:id', (req, res) => {
  const id = req.params.id;

  Usuario.findByIdAndDelete(id, (err, usuarioDB) => {

    if(err) {
      return res.status(400).json({
        ok: false,
        err: err.message,
      });
    }

    if(!usuarioDB) {
      return res.status(404).json({
        ok: false,
        err: 'Usuario no encontrado',
      });
    }

    return res.json({
      ok: true,
      result: usuarioDB,
    });
  });
});

module.exports = app;
