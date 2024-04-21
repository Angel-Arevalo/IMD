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
    if (direccion == "Leccion") {
        window.location.href = "Leccion.html";
    }if (direccion == "Menu") {
        window.location.href = "../Menu.html";
    }if (direccion == "Reto") {
        window.location.href = "Nivel.html";
    }if (direccion == "Evaluación") {
        window.location.href = "Examen.html";
    }
}

function Eleccion() {
    document.getElementById('Instrucciones').style.display = "none";
    document.getElementById('Mostrar').style.display = "block";
    horaInicial = Calificacion.TomarTiempo();
    console.log(horaInicial);
}

function Revision(respuestas, Nota) {
    let ResiduoMinutos = (Calificacion.TomarTiempo() - horaInicial)%60
    let Minutos = (Calificacion.TomarTiempo() - horaInicial - ResiduoMinutos)/60;
    console.log(ResiduoMinutos);
    new Calificacion(respuestas, document.getElementById('IngresoRespuestas').value, 
                        Nota + 0.5 * Minutos);
}