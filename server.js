var express = require("express")
var app = express()
var http = require('http').Server(app)
var bodyParser = require('body-parser')
var nodemailer = require('nodemailer')

var os = require('os')
var ifaces = os.networkInterfaces()


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
        pass: 'sinagoga123'
    }
}
var transporter = nodemailer.createTransport(smtpConfig)

app.post('/sendEmail', function(req, res){
	var mailOptions = {
	    from: '"Ivuch" <ivuch@kong.com>', // sender address
	    to: 'ivan.matellan@hotmail.com, maximatellan@gmail.com', // list of receivers
	    subject: 'Hello ✔', // Subject line
	    text: req.body.body // plaintext body
	};

	// send mail with defined transport object
	transporter.sendMail(mailOptions, function(error, info){
	    if(error){
	        return console.log(error);
	    }
	    console.log('Message sent: ' + info.response);
	})
})

app.get('/', function(req, res){
	res.sendFile(__dirname+"/index.html")
})

app.get('/index2', function(req, res){
	res.sendFile(__dirname+"/index2.html")
})

app.get('/ip', function(req, res){
	Object.keys(ifaces).forEach(function (ifname) {
	  var alias = 0
	  ifaces[ifname].forEach(function (iface) {
	    if ('IPv4' !== iface.family || iface.internal !== false) {
	      // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
	      return
	    }
	    if (alias >= 1) {
	      // this single interface has multiple ipv4 addresses
	      console.log(ifname + ':' + alias, iface.address)
	    } else {
	      // this interface has only one ipv4 adress
	      console.log(ifname, iface.address)
	      res.json({'ip':iface.address})
	    }
	    ++alias
	  })
	})
})

var server = http.listen(8080, function(){
	
	var port = server.address().port
	console.log("Server Running in http://127.0.0.1:"+port)
	console.log("Base dir: "+__dirname)
})

