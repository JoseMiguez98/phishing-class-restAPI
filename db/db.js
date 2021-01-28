function connect() {
  const mongoose = require('mongoose');

  return mongoose.connect(
    process.env.URLDB,
    err => {
      if (err) console.log('Database connection failed:', err);
      console.log('Database connected');
  });
}

module.exports = { connect };
