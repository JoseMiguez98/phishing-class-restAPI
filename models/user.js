var mongoose = require('mongoose');
var { Schema } = mongoose;

var userSchema = new Schema({
    username: {
      type: String,
    },
    password: {
      type: String,
    }
});

module.exports = mongoose.model('user', userSchema);
