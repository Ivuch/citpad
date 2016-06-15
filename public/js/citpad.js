var baseURL = "http://"+document.domain+":8080"

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
	var url = baseURL+"/sendEmail"
    var body = document.getElementById("contactText")
    var params = "body="+body.value
    alert(params)
    var xhr = getNewXHRObject()
    xhr.open("POST", url, true)
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(params)
    xhr.onreadystatechange = function() {
      if (xhr.readyState == XMLHttpRequest.DONE ) {
         if(xhr.status == 200){
            var content = xhr.getResponseHeader("Content-Type")
            if(content == "application/json; charset=utf-8"){
              var json = JSON.parse(xhr.responseText)
              if(json.isERROR){
                user.addClass("error")
                pass.classList.add("error")
              }
            }else{
              alert("Email Enviado")
            }  
          }else if(xhr.status == 400) {
            alert('There was an error 400')
          }else {
            alert('something else other than 200 was returned')
        }
      }
    }
}