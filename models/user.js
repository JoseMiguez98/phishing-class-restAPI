let mongoose = require('mongoose');
let { Schema } = mongoose;

let userSchema = new Schema({
    username: {
      type: String,
    },
    password: {
      type: String,
    }
});

module.exports = mongoose.model('user', userSchema);
