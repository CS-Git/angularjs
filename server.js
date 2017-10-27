var http = require('http');
var fs = require("fs");

var mime = require("mime");
var express = require("express");

var serviceMails = require(__dirname + "/get-mails.js");

// middlewares
var logger = require("morgan");
var serveStatic = require("serve-static");
var favicon = require("serve-favicon");
var bodyParser = require("body-parser");

var PORT = 80;

serviceMails.genererMails();

var app = express();

app.use(logger(":method :url"));
app.use(favicon(__dirname + "/app/favicon.ico"));
app.use(serveStatic(__dirname + "/app"));

// API
var api = express();

// Récupérer la liste des dossiers
// GET /api/dossiers
api.get("/dossiers", serviceMails.getDossiers);

// Récupérer un dossier
// GET /api/dossiers/idDossier
api.get("/dossiers/:idDossier", serviceMails.getDossier);



// Récupérer un mail
// GET /api/dossiers/idDossier/idMail
api.get("/dossiers/:idDossier/:idMail", serviceMails.getMail);


app.use(bodyParser.json());
// Envoyer un mail
// POST /api/envoi
api.post("/envoi", serviceMails.envoiMail);

app.use("/api", api);

http.createServer(app).listen(PORT);

console.log("Serveur démarré sur le port " + PORT);



/*var envoieFichier = function(res, url) {

  console.log("envoie fichier : " + url);

  var path = __dirname + "/app/" + url;
  fs.stat(path, function(err, stats) {
    if (!err && stats.isFile()) {

     var flux = fs.createReadStream(path, {
        flags: "r",
        autoClose: "true"
      });

    //var typeMime = mime.lookup(path);
      var typeMime = require('mime-types');

      res.writeHead(200, { "Content-Type": typeMime })
      flux.pipe(res);

    } else {
      envoie404(res);

    }
  })
}

var envoie404 = function(res) {
  res.writeHead(404, {"Content-Type": "text/html"});
  res.end("<h1>Page introuvable</h1>");
}*/

/*app.use(function(req,res,next) {
   if (req.url == "/") {
    res.writeHead(301, {"Location": "/index.html"});
    res.end();
  } else {
    next();
  }
});

app.use(function(req, res) {
  envoieFichier(res,req.url);
});*/


/*http.createServer(function(req, res) {

  //console.log(req.url);
  //console.log(req.method);
  //console.log(req.headers);

  if (req.url == "/") {
    res.writeHead(301, {"Location": "/index.html"});
    res.end();
  } else  {
    envoieFichier(res,req.url);
  }

}).listen(PORT);*/
