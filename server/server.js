const express = require('express');
const app = express();

const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }))

const PORT = 3100

app.listen(PORT, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });

require('./routes/query')(app);
