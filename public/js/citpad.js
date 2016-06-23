var baseURL = location.origin

function getNewXHRObject(){
  var xhr
  if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest()// code for IE7+, Firefox, Chrome, Opera, Safari
  } else {
      xhr = new ActiveXObject("Microsoft.XMLHTTP"); // code for IE6, IE5
    }
  return xhr;
}

function sendEmail(){
	document.getElementById("enviar").disabled = true;
	var url = baseURL+"/sendEmail"
	var name = document.getElementById("name")
	var email = document.getElementById("email")
  var body = document.getElementById("contactText")
  if(name.value == "" || email.value == "" || body.value == ""){
    if(name.value == ""){
      name.className += " error"
    }
    if(email.value == ""){
      email.className += " error"
    }
    if(body.value == ""){
      body.className += " error"
    }
    document.getElementById("enviar").disabled = false;  
  }
  else{
    var params = "name="+name.value+"&email="+email.value+"&body="+body.value
    var xhr = getNewXHRObject()
    xhr.open("POST", url, true)
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(params)
    xhr.onreadystatechange = function() {
      if (xhr.readyState == XMLHttpRequest.DONE ) {
      	document.getElementById("enviar").disabled = false;
        if(xhr.status == 200){
          var content = xhr.getResponseHeader("Content-Type")
          if(content == "application/json; charset=utf-8"){
            var json = JSON.parse(xhr.responseText)
            if(json.success){
              alert(json.info)
              document.getElementById("name").value = ""
    			   	document.getElementById("email").value = ""
       				document.getElementById("contactText").value = ""
            }else if(!json.success){
            	alert(json.info)
            }
          } 
        }
      }
    }
  }
}

/***  ERRORS CLEANER  ***/

document.getElementById("name").addEventListener("click", function(){
  var name = document.getElementById("name")
  name.className = name.className.replace('error','');
})

document.getElementById("email").addEventListener("click", function(){
  var email = document.getElementById("email")
  email.className = email.className.replace(/\berror\b/,'');
})

document.getElementById("contactText").addEventListener("click", function(){
  var body = document.getElementById("contactText")
  body.className = body.className.replace(/\berror\b/,'');
})