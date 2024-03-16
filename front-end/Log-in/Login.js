class User {
    //Variables
    #Username;#UserPassword;#UserRol;#bool;//bool es true si y solo si sedigitó bien el usuario y contraseña

    //Inicio de funciones set,get y constructor
    constructor() {
        this.#Username = "";
        this.#UserPassword = "";
    }

    set SetName(name) {
        this.#Username = name;
    }

    set Password(Password) {
        this.#UserPassword = Password;
    }

    get Bool() {
        return this.#bool;
    }
    //fin de funciones set, get y constructor

    //Guardar usuario
    SaveUser() {
        
        let NameHelp = document.getElementById("InputUser").value;
        let PassHelp = document.getElementById("InputPassword").value;
        let RolHelp = document.getElementById("Selector").value;

        if (NameHelp != "" && PassHelp != "" && PassHelp.length >= 8) {
            this.#UserPassword = PassHelp;
            this.#Username = NameHelp;
            this.#UserRol = RolHelp;
            this.#bool = true;
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
    SendDate() {
        fetch('http://localhost:5000/ruta_del_backend', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'Nombre':this.#Username,
                                  'Contraseña':this.#UserPassword,
                                  'Rol':this.#UserRol})
        }
        )
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
    }


    //Impreción de comprobación
    printDcot() {
        console.log(this.#Username, " ", this.#UserPassword, " "," ",this.#UserRol," ", this.#bool);
    }
}

//objeto para la creación de usuario y contraseña
const user = new User;

function Save() {//función para obtener el usuario del archivo HTML
    user.SaveUser();
    user.printDcot();
     user.SendDate();
}