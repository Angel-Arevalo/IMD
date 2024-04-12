let jugando = false, Mover;
let posicionesCuadrados = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false,
                           false, false, false, false, false, false, false, false, false, false]


console.log(document.getElementsByClassName("CuadradoPequeño1"));

function Jugar(nombre) {
    if (!jugando) {
        CrearObjeto(nombre);
        Mover = new MoverCuadrados(document.getElementById('Mover'), document.getElementsByClassName("CuadradoPequeño1"));
        jugando = true;
    }else alert("Ya está moviendo otro cuadrado");
}


function CrearObjeto(objeto) {

    let div = document.createElement('div');
    let divPadre = document.getElementById(objeto);
    let propiedades = divPadre.getBoundingClientRect();
    console.log(divPadre.getBoundingClientRect());

    div = divPadre.cloneNode(true);
    div.id = 'Mover';

    divPadre.style.background = "rgb(127, 127, 164)";
    div.style.background = "rgb(230, 230, 134)";
    div.style.border = "none";
    div.style.position = "absolute";
    div.style.top = (propiedades.top) + "px";
    div.style.left = propiedades.left + "px";
    div.style.right = propiedades.right + "px";
    div.style.bottom = propiedades.bottom + "px";
    div.removeAttribute('onclick');
    console.log(div);

    document.body.appendChild(div);
}
