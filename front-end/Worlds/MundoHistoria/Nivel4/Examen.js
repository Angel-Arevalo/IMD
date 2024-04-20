var leer = localStorage.getItem('mensaje');
let horaInicial;

addEventListener('load', function() {
    if (leer == "1") {
        localStorage.setItem('mensaje','0');
    } else if(leer == "0") {
        window.location.href = '../../../Log-in/Login.html';
    }  
});

let Veces = false;
let Nota = 0;

function Eleccion(ele) {
    if (ele == "Volver") {
        localStorage.setItem('mensaje', '1');
        window.location.href = "Leccion.html";
    } else if (ele == "VolverMenu"){
        localStorage.setItem('mensaje', '1');
        window.location.href = "../MundoHistoria.html";
    } else {
        document.getElementById('Instrucciones').style.display = "none";
        document.getElementById('Mostrar').style.display = "block";
        horaInicial = Calificacion.TomarTiempo();
        console.log(horaInicial);
    }
}

function Mostrar(imagen) {
    console.log(Nota);
    if (imagen == "Tablillas" && !Veces) {
        document.getElementById('Tablillas').style.display = "block";
        Nota += 0.25;
        Veces = true;
    }
}

function Revision() {
    let ResiduoMinutos = (Calificacion.TomarTiempo() - horaInicial) % 60;
    let Minutos = (Calificacion.TomarTiempo() - horaInicial - ResiduoMinutos) / 60;
    console.log(ResiduoMinutos);
    new Calificacion(['b', 'c', 'd', 'd', 'd'], document.getElementById('IngresoRespuestas').value, 
                        Nota + 0.5 * Minutos);
}
