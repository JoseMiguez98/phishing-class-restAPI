const app = require('express')();
const db = require('./db/db');
const bodyParser = require('body-parser');
const cors = require('cors');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// cors support
app.use(cors());

require('./config/config');

db.connect();

// config user controllers
app.use( require('./controllers/user') );
app.use( require('./controllers/usuario') );
app.use( require('./controllers/alumno') );


app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`));
