//funciones para Cargar página
var leer = localStorage.getItem('mensaje');

addEventListener('load', function() {
    if (leer == "1") {
        localStorage.setItem('mensaje','0');
    }else if(leer == "0") {
        window.location.href = '../../../Log-in/Login.html';
    }  
})

let Name = "";

let jugando = false;
let Mover, figura, listaObjetos;
let Paralelepipedo = 0, Triangulos = 0, Casas = 0, SemiTrig = 0, Cuadrados = 0, TMayor = 0; 

function empezar() {
    if (!jugando) {
        listaObjetos = document.getElementsByClassName(Name);
        switch (Name) {
            case "Paralelepipedo":
                if (Paralelepipedo != listaObjetos.length) {
                    CrearDiv(Name);
                    figura = document.getElementById('Mover');
                    Mover = new MoverParalelepipedos(figura, listaObjetos);
                    Paralelepipedo += 1;
                    jugando = true;
                }else alert("Ya están todos los objetos de este tipo rellenados.");
                break;
            case "Triangulo":
                if (Triangulos != listaObjetos.length) {
                    CrearDiv(Name);
                    figura = document.getElementById('Mover');
                    Mover = new MoverTriangulos(figura, listaObjetos);
                    Triangulos += 1;
                    jugando = true;
                }else alert("Ya están todos los objetos de este tipo rellenados.");
                break;
            case "Casa":
                if (Casas != listaObjetos.length) {
                    CrearDiv(Name);
                    figura = document.getElementById('Mover');
                    Mover = new MoverCasas(figura, listaObjetos);
                    Casas += 1;
                    jugando = true;
                }else alert("Ya están todos los objetos de este tipo rellenados.");
                break;
            case "Semi-trig":
                if (SemiTrig != listaObjetos.length) {
                    CrearDiv(Name);
                    figura = document.getElementById('Mover');
                    Mover = new MoverTrig(figura, listaObjetos);
                    SemiTrig += 1;
                    jugando = true;
                }else alert("Ya están todos los objetos de este tipo rellenados.");
                break;
            case "Cuadrado":
                if (Cuadrados != listaObjetos.length) {
                    CrearDiv(Name);
                    figura = document.getElementById('Mover');
                    Mover = new MoverCuad(figura, listaObjetos);
                    Cuadrados += 1;
                    jugando = true;
                }else alert("Ya están todos los objetos de este tipo rellenados.");
                break;

            case 'TMayor':
                if (TMayor != listaObjetos.length) {
                    CrearDiv(Name);
                    figura = document.getElementById('Mover');
                    Mover = new MoverTMayor(figura, listaObjetos);
                    TMayor += 1;
                    jugando = true;
                }else alert("Ya están todos los objetos de este tipo rellenados.");
                break
            default:
                break;
        }
        
    }else alert("Solo puede mover una figura a la vez");

}

function CrearDiv(tipo) {
    let divNew = document.createElement('div');
    let divOld = document.getElementById(tipo);
    //Creo al nuevo elemento
    divNew = divOld.cloneNode(true);
    divNew.id = 'Mover';
    divNew.style.background = "rgb(233, 221, 221)";
    //remuevo el evento que no es necesario
    divNew.removeAttribute('onclick');

    document.body.appendChild(divNew);
}

function Regresar() {
    localStorage.setItem('mensaje', '1');
    window.location.href = '../MundoHistoria.html';
}

function Verificar() {
    if (Paralelepipedo + Cuadrados + Triangulos + Casas + SemiTrig + Cuadrados + TMayor == 30) {
        localStorage.setItem('mensaje', '1');
        window.location.href = '../MundoHistoria.html';
    }else alert("Aún hay figuras sin acomodar");
}
var fechaHoraInicio = new Date(0);
let fechae = fechaHoraInicio.toString();
console.log(fechae.split(' ')[4]);