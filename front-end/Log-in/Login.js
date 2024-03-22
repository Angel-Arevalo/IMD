class User {
    //Variables
    #Username;#UserPassword;//bool es true si y solo si sedigitó bien el usuario y contraseña
    //Inicio de funciones set,get y constructor
    constructor() {
        this.#Username = "";
        this.#UserPassword = "";
    }

    get GetName() {
        return this.#Username;
    }
    //fin de funciones set, get y constructor

    //Guardar usuario
    SaveUser() {  
        let NameHelp = document.getElementById("InputUser").value;
        let PassHelp = document.getElementById("InputPassword").value;

        if (NameHelp != "" && PassHelp != "") {
            this.#UserPassword = PassHelp;
            this.#Username = NameHelp;
            this.SendData();
        } else this.AlertUser(NameHelp,PassHelp);
        
    }

    //Método para alertar que se está insertando algo mal
    AlertUser(Name, Pass) {
        let Help = "", bool = false;
        if (Name == "") {
            Help += "Usuario incorrecto. ";
        } if (Pass == "") {
            bool = true;
            Help += "Contraseña vacía. ";
        } if (Pass.length < 8 && bool == false) {
            Help += "Contraseña invalida.";
        }
        alert(Help);
    }
    //Enviar información al back-end
    SendData() {
        fetch('http://localhost:5000/ruta_del_backend', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'Nombre':this.#Username,
                                  'Contraseña':this.#UserPassword,
                                  'Correo': "",
                                  'Rol': "",})
        }
        )
        .then(response => response.json())
        .then(data => {
            alert(data.mensaje)
            if(data.mensaje == "Usuario recibido"){
                localStorage.setItem('mensaje', '1');
                window.location.href = '../Worlds/EscogerMundo.html';
            }else alert(data.mensaje)})
        .catch(error => console.error('Error:', error));
    }
}

//objeto para la creación de usuario y contraseña
const user = new User;

function Save() {//función para obtener el usuario del archivo HTML
    user.SaveUser();
}

