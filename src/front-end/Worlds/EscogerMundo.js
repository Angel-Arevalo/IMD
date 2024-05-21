const mostrar = document.getElementById("Mostrar");

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
            const button = document.createElement('button');

            button.setAttribute("class", "Boton");
            button.style.position = "absolute";
            button.style.top = "35%";
            button.style.right = "5%";
            button.textContent = "Revisar mis aulas";

            button.addEventListener('click', function() {Viajar(4)});

            document.body.appendChild(button);
        }

        mostrar.style.display = "block";
    }
}

const escogerMundo = new EscogerMundo()