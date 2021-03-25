
const app = require('express')();
const _ = require('lodash');
const Alumno = require('../models/alumno');
const serverErrorResponse = {
  ok: false,
  status: 500,
  error: 'Ocurrio un error al procesar la consulta, intente de nuevo mas tarde',
};
const alumnoNotFoundResponse = {
  ok: false,
  status: 404,
  error: 'Alumno no encontrado',
};

app.get('/alumno', (req, res) => {
  if(!req.query.numeroGrupo) {
    return res.status(400).json({
      ok: false,
      status: 400,
      error: 'Debe especificar un numero de grupo',
    });
  }

  const numeroGrupo = req.query.numeroGrupo;

  Alumno.find({ numeroGrupo }, (err, resultado) => {
    if(err) {
      return res.status(500).json(serverErrorResponse);
    }

    res.json({
      ok: true,
      resultado,
      status: 200,
    });
  });
});

app.get('/alumno/:id', (req, res) => {
  if(!req.query.numeroGrupo) {
    return res.status(400).json({
      ok: false,
      status: 400,
      error: 'Debe especificar un numero de grupo',
    });
  }

  const id = req.params.id;
  const numeroGrupo = req.query.numeroGrupo;

  Alumno.findOne({
    '_id': id,
    numeroGrupo
  }, (err, alumno) => {
    if(err) {
      return res.status(500).json(serverErrorResponse);
    }

    if(!alumno) {
      return res.status(404).json(alumnoNotFoundResponse);
    }

    return res.json({
      ok: true,
      status: 200,
      resultado: [ alumno ],
    });
  });
});

app.post('/alumno', (req, res) => {
  if(!req.query.numeroGrupo) {
    return res.status(400).json({
      ok: false,
      status: 400,
      error: 'Debe especificar un numero de grupo',
    });
  }
  const {
    nroAlumno,
    nombre,
    apellido,
    edad,
    ciudad,
  } = req.body;
  const numeroGrupo = req.query.numeroGrupo;
  const nuevoAlumno = new Alumno({
    nroAlumno,
    nombre,
    apellido,
    edad,
    ciudad,
    numeroGrupo,
  });

  console.log(numeroGrupo, nroAlumno, nombre);

  if(nroAlumno.length !== 6) {
    return res.status(400).json({
      ok:false,
      status: 400,
      error: 'El numero de alumno debe tener 6 digitos',
    });
  }

  Alumno.findOne(
    {numeroGrupo, nroAlumno},
    (err, alumno) => {
    if(err) {
      return res.status(500).json(serverErrorResponse);
    }

    if(!alumno) {
      nuevoAlumno.save((err, alumno) => {
        if(err) {
          return res.status(400).json({
            ok: false,
            status: 400,
            error: err.message,
          });
        }

        return res.json({
          ok: true,
          status: 200,
          resultado: [ alumno ],
        });
      });
    } else {
      return res.status(400).json({
        ok: false,
        status: 400,
        error: 'Ya existe un alumno con el mismo nroAlumno',
      });
    }
  });
});

app.put('/alumno/:id', (req, res) => {
  if(!req.query.numeroGrupo) {
    return res.status(400).json({
      ok: false,
      status: 400,
      error: 'Debe especificar un numero de grupo',
    });
  }
  const id = req.params.id;
  const numeroGrupo = req.query.numeroGrupo;
  const body = _.pick(req.body, [
    'nroAlumno',
    'nombre',
    'apellido',
    'edad',
    'ciudad',
  ]);

  Alumno.findOneAndUpdate(
    { '_id': id, numeroGrupo },
    body,
    {
      context: 'query',
      new: true,
      runValidators: true,
    }, (err, alumno) => {
    if(err) {
      return res.status(400).json({
        ok: false,
        status: 400,
        err: err.message,
      });
    }

    if(!alumno) {
      return res.status(404).json(alumnoNotFoundResponse);
    }

    return res.json({
      ok: true,
      status: 200,
      resultado: [ alumno ],
    });
  });
});

app.delete('/alumno/:id', (req, res) => {
  if(!req.query.numeroGrupo) {
    return res.status(400).json({
      ok: false,
      status: 400,
      error: 'Debe especificar un numero de grupo',
    });
  }
  const numeroGrupo = req.query.numeroGrupo;
  const id = req.params.id;

  Alumno.findOneAndDelete({
    '_id': id,
    numeroGrupo,
  }, (err, alumno) => {
    if(err) {
      return res.status(400).json({
        ok: false,
        status: 400,
        err: err.message,
      });
    }

    if(!alumno) {
      return res.status(404).json(alumnoNotFoundResponse);
    }

    return res.json({
      ok: true,
      status: 200,
      resultado: [ alumno ],
    });
  });
});

module.exports = app;
