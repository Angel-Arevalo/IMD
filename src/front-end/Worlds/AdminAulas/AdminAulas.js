let cargando = false;
let dta, notes;

class AdminAulas {
    #Aula = "";
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

        if (!cargando) {
            this.#Select += 1;
        } else alert("Está cargando otro proceso.");


        if (this.#Select % 2 == 1 && !cargando) {
            cargando = true;
            this.AskForCurs();
            new BuildProgressVar(document.getElementById("BODY"), "la información de sus aulas");
        } else if (this.#Select % 2 == 0) {
            document.getElementById("BODY").innerHTML = "";
        }
        cur.innerHTML = this.#List[this.#Select % 2];
    }

    BuildTable() {
        const table = document.createElement("Table");
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
        table.id = "tableClassrooms";

        document.getElementById("BODY").appendChild(table);

    }

    buildTableStudents(infoSalon) {
        const table = document.createElement("table");
        let result = "";
        let lengthInfo = Object.keys(infoSalon).length;
        if (lengthInfo == 0) {
            table.innerHTML = "<thead><tr><th>No hay estudiantes en esta aula</th></tr></thead>";
        } else {
            let keys = Object.keys(infoSalon);
            let values = Object.values(infoSalon);
    
            for (let i = 0; i < lengthInfo; i++) {
                result += `<tr><td>${keys[i]}</td><td>${values[i]}</td>
                            <td><button class='Boton' onclick='adminAulas.AskForStudents("${this.#Aula}", "${keys[i]}")'>
                            Mostrar info de este estudiante</button></td></tr>`;
            }
    
            table.innerHTML = `<thead><tr>
                                <th>Nombre del estudiante</th>
                                <th>Correo</th>
                                <th><button class='Boton'>Mostrar info general</button></th>
                                </tr></thead>
                                <tbody>${result}</tbody>`;
        }
    
        table.id = "TableStudents";
        table.style.display = "block";
        document.getElementById("BODY").appendChild(table);
    }
    

    ClearTableStudent() {
        try {
            document.getElementById("BODY").removeChild(document.getElementById("TableStudets"));
        } catch { }
    }

    CrateTableNotes() {

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
        if (!cargando) {
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
                .catch(error => console.error(error))
            this.ClearTableStudent();
            new BuildProgressVar(document.getElementById("BODY"), "aula " + classroom, 0);
            this.#Aula = classroom;
        } else alert("Está cargando otro proceso.");

    }

    AskForStudents(classroom, estudiante = "") {
        if (!cargando) {

            fetch("http://localhost:5000/Backend/Calificaciones/PedirNotas", {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ "Aula": classroom, "Nombre": estudiante })
            })
                .then(response => response.json())
                .then(data => {
                    notes = data;
                })
                .catch(error => console.error(error))
        } else alert("Está cargando otro proceso")
    }
}
