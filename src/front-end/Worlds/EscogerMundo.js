class EscogerMundo {
    #Rol; 
    #Username;

    constructor() {
        this.#Username = localStorage.getItem('Nombre');
        this.#Rol =  localStorage.getItem('Rol');

        this.ShowName();
        this._ShowBotoom();
    }

    ShowName() {
        document.getElementById("Nombre").innerHTML = this.#Username;
    }

    _ShowBotoom() {

        const button = document.getElementById("Span");

        if (this.#Rol == "Estudiante") {
            //en esta parte verificamos si está en un
            //aula
            
        }else {
            button.textContent = "Revisar mis aulas";

            button.addEventListener('click', function() {Viajar(4)});
        }

        mostrar.style.display = "flex";
    }
}

const mostrar = document.getElementById("Mostrar");
const escogerMundo = new EscogerMundo()