const mongoose = require('mongoose');
const { Schema } = mongoose;
const uniqueValidator = require('mongoose-unique-validator');
const autoIncrement = require('mongoose-auto-increment');

let alumnoSchema = new Schema({
  nroAlumno: {
    type: Number,
    required: [true, 'nroAlumno es requerido'],
  },
  nombre: {
    type: String,
    required: [true, 'nombre es requerido'],
  },
  apellido: {
    type: String,
    required: [true, 'apellido es requerido'],
  },
  edad: {
    type: Number,
    required: [true, 'edad es requerido'],
  },
  ciudad: {
    type: String,
    required: [true, 'ciudad es requerido'],
  },
  numeroGrupo: {
    type: Number,
  },
});

autoIncrement.initialize(mongoose.connection);
alumnoSchema.plugin( uniqueValidator,  { message: '{PATH} existente, por favor elija otro' } );
alumnoSchema.plugin( autoIncrement.plugin, 'alumno');

module.exports = mongoose.model('alumno', alumnoSchema);
