var express = require("express")
var app = express()
var http = require('http').Server(app)
var bodyParser = require('body-parser')
var nodemailer = require('nodemailer')

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
        user: 'ivan.matellan@snoopconsulting.com',
        pass: 'asdediamante123'
    }
}
var transporter = nodemailer.createTransport(smtpConfig)

app.post('/sendEmail', function(req, res){
	var mailBody = "Nombre:   "+req.body.name+"\n\nEmail:    "+req.body.email+"\n\nMensaje:  "+req.body.body
	var mailOptions = {
	    from: '"CitpadWeb"', // sender address
	    to: ' ivan.matellan@hotmail.com', // list of receivers: citpadsrl@gmail.com, citpad.adm@gmail.com,
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


var server = http.listen(8080, function(){
	
	var port = server.address().port
	console.log("Server Running in http://127.0.0.1:"+port)
	console.log("Base dir: "+__dirname)
})

