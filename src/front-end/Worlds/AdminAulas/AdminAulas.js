class AdminAulas {

    #UserName;
    #List; #Select = 0;
    #classrooms = [];
    constructor() {
        this.#UserName = localStorage.getItem("Nombre");
        this.#List = ["Ver mis cursos", "Dejar de ver mis cursos"];


        this.ShowName();
        this.AskForCurs();
    }

    get GET() {
        console.log(this.#classrooms);
    }
    ShowName() {
        const titulo = document.getElementById("Titulo");

        titulo.innerHTML = `Bienvenido profesor ${this.#UserName}`;
        titulo.style.fontSize = "3vw";
    }

    ShowCur() {
        const cur = document.getElementById("Cur");

        this.#Select += 1;

        if (this.#Select % 2 == 1) {
            this.AskForCurs();
            this.BuildTable();
        } else document.getElementById("TableClassrooms").style.display = "none";

        cur.innerHTML = this.#List[this.#Select % 2];
    }

    BuildTable() {
        const table = document.getElementById("TableClassrooms");
        let result = "";
        if (this.#classrooms.length == 0) {
            table.innerHTML = "<thead><tr><th>Usted no tiene aulas</th></thead>"
        } else {
            for (let i = 0; i < this.#classrooms.length; i++) {
                result += `<tr>
                            <td>${this.#classrooms[i]}</td>
                            <td><button class='Boton' 
                            onclick='adminAulas.AskForInfoOfClassroom("${this.#classrooms[i]}")'>
                            mostrar info de esta aula</button></td>
                            </tr>`;

            }

            table.innerHTML = `<thead><tr><th>Códigos de sus aulas</th><th>Mostrar</th></tr></thead><tbody>${result}</tbody>`;
        }

        table.style.display = "block";

    }

    AskForCurs() {
        fetch('http://localhost:5000/Backend/InfoBasica/Aulas', {
            method: "POST",
            mode: "cors",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "Usuario": this.#UserName })
        })
            .then(response => response.json())
            .then(data => {
                this.#classrooms = data.Aulas;
            })
            .catch(error => console.error('Error:', error));
    }

    CreateClass() {
        fetch("http://localhost:5000/Backend/CrearAula", {
            method: "POST",
            mode: "cors",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "Usuario": this.#UserName })
        })
            .then(response => response.json())
            .then(data => {
                alert(data.mensaje);
            })
            .catch (error => console.error(error))
    }

    AskForInfoOfClassroom(classroom) {
        fetch("http://localhost:5000/Backend/InfoAula", {
            method: "POST",
            mode: "cors",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"Codigo": classroom})
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.InfSalon);
        })
    }
}