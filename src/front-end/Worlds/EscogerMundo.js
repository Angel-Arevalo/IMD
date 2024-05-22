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

        if (this.#Rol == "Estudiante") {
            //en esta parte verificamos si está en un
            //aula
            
        }else {
            const button = document.createElement('div');
            const Append = document.getElementById("NombreSelect");

            button.setAttribute("class", "Boton");
            button.style.position = "relative";
            button.textContent = "Revisar mis aulas";
            button.style.color = "black";

            button.addEventListener('click', function() {Viajar(4)});

            Append.appendChild(button);
        }

        mostrar.style.display = "flex";
    }
}

const mostrar = document.getElementById("Mostrar");
const escogerMundo = new EscogerMundo()