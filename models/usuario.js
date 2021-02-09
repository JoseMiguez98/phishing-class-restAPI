const mongoose = require('mongoose');
const { Schema } = mongoose;
const uniqueValidator = require('mongoose-unique-validator');
const autoIncrement = require('mongoose-auto-increment');

let usuarioSchema = new Schema({
    nombreDeUsuario: {
      type: String,
      index:{ unique: true },
      required: [true, 'nombreDeUsuario es requerido'],
    },
    email: {
      type: String,
      index:{ unique: true },
      required: [true, 'email es requerido'],
    },
    password: {
      type: String,
      required: true,
    },
    telefono: {
      type: Number
    },
    direccion: {
      type: String
    },
    casado: {
      type: Boolean,
      default: false,
    }
});

autoIncrement.initialize(mongoose.connection);
usuarioSchema.plugin( uniqueValidator,  { message: '{PATH} existente, por favor elija otro' } );
usuarioSchema.plugin( autoIncrement.plugin, 'usuario');

module.exports = mongoose.model('usuario', usuarioSchema);
