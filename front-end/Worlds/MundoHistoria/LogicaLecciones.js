var leer = localStorage.getItem('mensaje');

addEventListener('load', function() {
    if (leer == "1") {
        localStorage.setItem('mensaje','0');
    }else if(leer == "0") {
        window.location.href = '../../../Log-in/Login.html';
    }  
})

function Viajar(direccion) {
    localStorage.setItem('mensaje', '1');
    if (direccion == "Menu") {
        window.location.href = "../MundoHistoria.html";
    }if (direccion == "Reto") {
        window.location.href = "Nivel.html";
    }if (direccion == "Evaluación") {
        window.location.href = "Examen.html";
    }
}