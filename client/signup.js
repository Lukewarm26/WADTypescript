

$("#password").keyup(function(event) {
    if (event.keyCode == 13) {
        submit();
    }
});

const element = document.getElementById("go");
element.addEventListener("click", submit);

function submit() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    if(username == "" || password == "") return;
    document.getElementById("username").value = "";
    document.getElementById("password").value = "";

    console.log(username);
    console.log(password);

    $.post("http://localhost:8080/signup", {Username: username, Password: password}, function(data){
        if(data == 'yes') {
          text(true);
        }
        else text(false);
      });
}

function text(asd) {
    const template = document.createElement('div');
    if(asd) {
        template.innerHTML = "Signup Successful";
    }
    else {
        template.innerHTML = "Signup Failed, try a diffrent username";
    }
    document.body.appendChild(template);
}