let Name = "";

let jugando = false;
let Mover, figura, listaObjetos;

function empezar() {
    if (!jugando) {
        switch (Name) {
            case "Paralelepipedo":
                break;
            case "Triangulo":
                CrearDiv(Name);
                figura = document.getElementById('Mover');
                listaObjetos = document.getElementsByClassName('Triangulo');
                Mover = new MoverTriangulos(figura, listaObjetos, listaObjetos.length);
                break;
            default:
                break;
        }
        jugando = true;
    }else alert("Solo puede mover una figura a la vez");
}

function CrearDiv(tipo) {
    let divNew = document.createElement('div');
    let divOld = document.getElementById(tipo);
    //Creo al nuevo elemento
    divNew = divOld.cloneNode(true);
    divNew.id = 'Mover';
    divNew.style.background = "rgb(233, 221, 221)";

    divNew.removeAttribute('onclick');

    document.body.appendChild(divNew);
}