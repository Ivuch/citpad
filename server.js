var express = require("express")
var app = express()
var http = require('http')
var https = require('https')
var bodyParser = require('body-parser')
var nodemailer = require('nodemailer')
var fs = require("fs")

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // to support URL-encoded bodies
app.use(express.static(__dirname+"/public"))

/*
Log into your google email account and then go to this link: 
https://www.google.com/settings/security/lesssecureapps 
https://accounts.google.com/b/0/DisplayUnlockCaptcha
*/
var smtpConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
        user: 'citpad.adm@gmail.com',
        pass: 'citpadadministracion123'
    }
}
var transporter = nodemailer.createTransport(smtpConfig)

app.post('/sendEmail', function(req, res){
	var mailBody = "Nombre:   "+req.body.name+"\n\nEmail:    "+req.body.email+"\n\nMensaje:  "+req.body.body
	var mailOptions = {
	    from: '"CitpadWeb"', // sender address
	    to: 'citpadsrl@gmail.com, citpad.adm@gmail.com', // list of receivers: 
	    subject: 'Contacto desde Citpad-Web ✔', // Subject line
	    text: mailBody // plaintext body
	};

	// send mail with defined transport object
	transporter.sendMail(mailOptions, function(error, info){
	    if(error){
	    	console.log(error)
	        return res.json({success: false, info: 'Ha habido un problema, vuelve a intentar en unos momentos'});
	    }
	    console.log('Message sent: ' + info.response);
	    res.json({success: true, info: 'Tu mensaje se ha Enviado con éxito!'})
	})
})

app.get('/', function(req, res){
	res.sendFile(__dirname+"/index.html")
})

app.get('/tlccas', function(req, res){
	res.sendFile(__dirname+"/test.html")
})

http.createServer(function (req, res) {
    res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
    res.end();
}).listen(80);

/*
var server = http.listen(80, function(){
	
	var port = server.address().port
	console.log("Server Running in http://127.0.0.1:"+port)
	console.log("Base dir: "+__dirname)
})
*/

var options = {
	key: fs.readFileSync('/etc/letsencrypt/live/www.citpad.com.ar/privkey.pem'),
  	cert: fs.readFileSync('/etc/letsencrypt/live/www.citpad.com.ar/fullchain.pem'),
  	ca: fs.readFileSync('/etc/letsencrypt/live/www.citpad.com.ar/chain.pem')
}

var sserver = https.createServer(options, app).listen(443, function(){
	console.log("Secure conction Established - HTTPS - SSL")
})

