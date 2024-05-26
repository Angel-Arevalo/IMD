var leer = localStorage.getItem('mensaje');

addEventListener('load', function () {
    if (leer == "1") {
        localStorage.setItem('mensaje', '0');
    } else if (leer == "0") {
        window.location.href = '../../../Log-in/Login.html';
    }
})

function Viajar(direccion) {
    localStorage.setItem('mensaje', '1');
    if (direccion == "Leccion") {
        window.location.href = "Leccion.html";
    } if (direccion == "Menu") {
        window.location.href = "../Menu.html";
    } if (direccion == "Reto") {
        window.location.href = "Nivel.html";
    } if (direccion == "Evaluación") {
        window.location.href = "Examen.html";
    }
}

function Eleccion(Mundo, Nivel) {
    document.getElementById('Instrucciones').style.display = "none";
    document.getElementById('Mostrar').style.display = "block";
    horaInicial = Calificacion.TomarTiempo();
    ModifyLocalStorage(7 * (Mundo - 1) + Nivel - 1);
    Calificacion.EnviarNota(Mundo, Nivel, 0, 0, 1)
}

function Revision(respuestas, Nota, Mundo, Nivel, bajar = 0.5, bajarReto = 1) {
    let Minutos = 0;

    if (Nota != 0) {
        let Tiempo = Calificacion.TomarTiempo()
        let ResiduoMinutos = (Tiempo - horaInicial) % 60
        Minutos = (Tiempo - horaInicial - ResiduoMinutos) / 60;
    }

    const calificacion = new Calificacion(respuestas, document.getElementById('IngresoRespuestas').value,
        Nota + 0.4 * Minutos, bajarReto);
    Calificacion.EnviarNota(Mundo, Nivel, calificacion.nota, bajar, 1);
    ModifyLocalStorage(7 * (Mundo - 1) + Nivel - 1, calificacion.nota);
    Viajar("Menu");
}

function ModifyLocalStorage(index, nota = 0) {
    let notas = localStorage.getItem("Notas").split(',');

    notas[index] = `${nota}`;

    localStorage.setItem("Notas", notas);
}

function Verificar(objetos, Acomodados = 0, m, n) {
    // m means world and n means level
    let nota = 0;
    if (objetos == Acomodados) {
        nota = 2.5;
        Calificacion.EnviarNota(m, ((7 * (m - 1) + 3 + n)%7)%3, nota, 1, 2);
        ModifyLocalStorage(7 * (m - 1) + 3 + n, nota);

        alert("Juego terminado, bien hecho");
        setTimeout(Viajar("Menu"), 4000)
    }else alert(`Aún quedan ${objetos - Acomodados} figuras por acomodar`);
}