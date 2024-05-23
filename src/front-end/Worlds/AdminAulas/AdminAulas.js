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
            setTimeout(function () {
                adminAulas.BuildTable()
            }, 1000)
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

    BuildTableStudents(infoSalon) {
        const table = document.getElementById("TableStudets");
        let result = ""
        let lengthInfo = Object.keys(infoSalon).length;
        if (lengthInfo == 0) {
            table.innerHTML = "<thead><tr>No hay estudiantes en esta aula</tr></thead>";
        }else {
            let keys = Array.from(Object.keys(infoSalon));
        let values = Array.from(Object.values(infoSalon));

        for (let i = 0; i < lengthInfo; i++) {
            result += `<tr><td>${keys[i]}</td><td>${values[i]}</td>
                        <td><button class='Boton'>Mostrar info de este estidiante</button></td></tr>`;
        }

        table.innerHTML = `<thead><tr><th>Nombre del estudiante</th>
                            <th>Correo</th>
                            <th><button class='Boton'>Mostrar info general</button></th></tr>
                            </thead><tbody>${result}</tbody>`;
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
            .catch(error => console.error(error))
    }

    AskForInfoOfClassroom(classroom) {
        let dta;
        fetch("http://localhost:5000/Backend/InfoAula", {
            method: "POST",
            mode: "cors",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "Codigo": classroom })
        })
            .then(response => response.json())
            .then(data => {
                dta = data.InfSalon;
            })

        setTimeout(function () {
            adminAulas.BuildTableStudents(dta);
        }, 1000);
    }
}
