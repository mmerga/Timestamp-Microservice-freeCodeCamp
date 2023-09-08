// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

//entry /api/2015-12-25
// return {"unix":1451001600000,"utc":"Fri, 25 Dec 2015 00:00:00 GMT"}
//entry /api/1451001600000
// return {"unix":1451001600000,"utc":"Fri, 25 Dec 2015 00:00:00 GMT"}

app.get("/api/:date?", (req, res) => {
  const dateValue = req.params.date;

  if (!dateValue) {
    // Se vazio retorna data atual
    const unixTime = Date.now();
    const utcTime = new Date(unixTime).toUTCString();
    return res.json({
      unix: unixTime,
      utc: utcTime
    });
  }
  // verifica se tem digitos no começo e no final, se for é UNIX
  // entao converte para INT e salva como data UNIX
  // se nao pega data no formato String - pode ser UTC ou NAO
  const parsedDate = /^\d+$/.test(dateValue)
    ? new Date(parseInt(dateValue))
    : new Date(dateValue);
  // verifica se é data valida, UTC
  if (isNaN(parsedDate.getTime())) {
    return res.json({ error: "Invalid Date" });
  }
  // converte a data para seus devidos lugares
  let unixTime = parsedDate.getTime();
  unixTime = parseInt(unixTime);
  const utcTime = parsedDate.toUTCString();
  // responde com um JSON, attr "unix" e "utc"
  res.json({
    unix: unixTime,
    utc: utcTime
  });
});
