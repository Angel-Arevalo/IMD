let Name = "";

let jugando = false;
let Mover, figura, listaObjetos;

function empezar() {
    if (!jugando) {
        switch (Name) {
            case "Paralelepipedo":
                break;
            case "TranguloColaiv":
                CrearDiv(Name);
                figura = document.getElementById('Mover');
                listaObjetos = document.getElementsByClassName('Triangulo');
                console.log(listaObjetos);
                Mover = new MoverTriangulos(figura, listaObjetos);
                break;
            default:
                break;
        }
    }
}

function CrearDiv(tipo) {
    let div = document.createElement('div');

    div.classList.add(tipo);
    div.id = 'Mover';
    div.style.background = "rgb(186, 184, 184)";
    div.style.top = 

    document.body.appendChild(div);
}