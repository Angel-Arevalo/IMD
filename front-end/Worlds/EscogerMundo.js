var leer = localStorage.getItem('mensaje');

addEventListener('load', function() {
    if (leer == "1") {
        localStorage.setItem('mensaje','0');
    }else if(leer == "0") {
        window.location.href = '../Log-in/Login.html';
    }  
})

var Username = localStorage.getItem('Nombre');
localStorage.setItem('Nombre','');
document.getElementById("Nombre").innerHTML = Username;

function Pasar() {
    localStorage.setItem('mensaje','1');
    localStorage.setItem('Nombre', Username);
}
