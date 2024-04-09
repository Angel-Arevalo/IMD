var leer = localStorage.getItem('mensaje');

addEventListener('load', function() {
    if (leer == "1") {
        localStorage.setItem('mensaje','0');
        horaInicial = ObtenerHora();
    }else if(leer == "0") {
        window.location.href = '../../../Log-in/Login.html';
    }  
})

function Viajar(direccion) {
    if (direccion == "Menu") {
        localStorage.setItem('mensaje', '1');
        window.location.href = "../MundoHistoria.html";
    }if (direccion == "Reto") {
        localStorage.setItem('mensaje', '1');
        window.location.href = "Nivel1.html";
    }if (direccion == "Evaluación") {
        localStorage.setItem('mensaje', '1');
        window.location.href = "Examen1.html";
    }
}