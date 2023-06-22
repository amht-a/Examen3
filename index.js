var currentPlayer = "";
var cells = document.getElementsByClassName("cell");
var result = document.getElementById("result");
var gameEnded = false;;

// Matriz de 3x3 para representar el tablero
var board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
];

// Función para seleccionar aleatoriamente quién comienza entre el jugador y la computadora
function selectRandomPlayer() {
    var randomNum = Math.floor(Math.random() * 2);
    currentPlayer = randomNum === 0 ? "X" : "O";

    // Si el jugador es la computadora, se realiza el primer movimiento
    if (currentPlayer === "O") {
        makeComputerMove();
    }
}
// Función para realizar un movimiento del jugador
function makeMove(index) {
    if (gameEnded || board[Math.floor(index / 3)][index % 3] !== "") {
        return;
    }

    board[Math.floor(index / 3)][index % 3] = currentPlayer;
    cells[index].innerText = currentPlayer;

    const nombre = localStorage.getItem('ID');


    if (checkWin()) {
        result.innerText = "¡" + currentPlayer + " ha ganado!";
        gameEnded = true;
        actualizarCampo(nombre);

        return;
    }

    if (checkDraw()) {
        result.innerText = "El juego ha terminado en empate.";
        gameEnded = true;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";


    // Movimiento de la computadora
    setTimeout(makeComputerMove, 500);
    cells[computerMove.row * 3 + computerMove.column].innerText = currentPlayer;
    cells[computerMove.row * 3 + computerMove.column].classList.add(currentPlayer.toLowerCase());
    cells[computerMove.row * 3 + computerMove.column].classList.remove((currentPlayer === "X" ? "O" : "X").toLowerCase());

}

// Función para realizar el movimiento de la computadora
function makeComputerMove() {
    if (gameEnded) {
        return;
    }

    let emptyCells = [];

    // Encontrar las casillas vacías
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === "") {
                emptyCells.push({ row: i, column: j });
            }
        }
    }

    // Elegir una casilla aleatoriamente
    let randomIndex = Math.floor(Math.random() * emptyCells.length);
    let computerMove = emptyCells[randomIndex];

    board[computerMove.row][computerMove.column] = currentPlayer;
    cells[computerMove.row * 3 + computerMove.column].innerText = currentPlayer;
    cells[computerMove.row * 3 + computerMove.column].classList.add(currentPlayer.toLowerCase());
  

    if (checkWin()) {
        result.innerText = "¡La computadora ha ganado!";
        gameEnded = true;
        return;
    }

    if (checkDraw()) {
        result.innerText = "El juego ha terminado en empate.";
        gameEnded = true;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
}

// Función para verificar si alguien ha ganado
function checkWin() {
    for (let i = 0; i < 3; i++) {
        if (
            board[i][0] !== "" &&
            board[i][0] === board[i][1] &&
            board[i][0] === board[i][2]
        ) {
            return true;
        }

        if (
            board[0][i] !== "" &&
            board[0][i] === board[1][i] &&
            board[0][i] === board[2][i]
        ) {
            return true;
        }
    }

    if (
        board[0][0] !== "" &&
        board[0][0] === board[1][1] &&
        board[0][0] === board[2][2]
    ) {
        return true;
    }

    if (
        board[0][2] !== "" &&
        board[0][2] === board[1][1] &&
        board[0][2] === board[2][0]
    ) {
        return true;
    }

    return false;
}

// Función para verificar si hay un empate
function checkDraw() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === "") {
                return false;
            }
        }
    }
    return true;
}

// Función para reiniciar el juego
function resetGame() {
    currentPlayer = "X";
    board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];
    gameEnded = false;
    result.innerText = "";
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerText = "";
        cells[i].classList.remove("x", "o");
    }
    selectRandomPlayer()
}

var playerButtonsContainer = document.getElementById("playerButtonsContainer");
if (playerButtonsContainer) {
    // Agregar un contenedor div para los botones de los jugadores
    var playerButtonsContainer = document.createElement("div");
    playerButtonsContainer.setAttribute("id", "playerButtonsContainer");
    document.body.appendChild(playerButtonsContainer);;

    // Función para crear un botón de jugador
    function createPlayerButton(User, Victorias) {
        var verJugadorButton = document.createElement("button");
        verJugadorButton.setAttribute("id", User);
        verJugadorButton.classList.add("custom-button");
        verJugadorButton.innerText = User;

        verJugadorButton.addEventListener("click", function () {
            obtenerIdDocumento(User).then(function (IDDOCUMENTO) {
                // Lógica para mostrar información adicional del jugador
                console.log("Mostrar información del jugador:", User, Victorias);
                localStorage.setItem('ID', IDDOCUMENTO);
                var InfJugador = document.createElement("p");
                InfJugador.textContent = "Jugador: " + User + " Victorias: " + Victorias;
                InfJugador.classList.add("custom-p");
                document.body.appendChild(InfJugador);

                var backButton = document.createElement("button");
                backButton.textContent = "Atras";
                backButton.classList.add("custom-button");
                document.body.appendChild(backButton);
                backButton.addEventListener("click", function () {
                    InfJugador.remove();
                    backButton.remove();
                    goToPageButton.remove();
                });

                var goToPageButton = document.createElement("button");

                goToPageButton.textContent = "Jugar!";
                goToPageButton.classList.add("custom-button");
                document.body.appendChild(goToPageButton);


                goToPageButton.addEventListener("click", function () {
                    window.location.href = "./Index.html";

                });

            }).catch(function (error) {
                console.error("Error al obtener el ID del documento:", error);
            });
        });

        playerButtonsContainer.appendChild(verJugadorButton);
    }

    function agregarElementoFirestore() {
        // Captura el evento de envío del formulario
        var agregarJugadorForm = document.getElementById("AgregarJugador");
        if (agregarJugadorForm) {
            agregarJugadorForm.addEventListener("submit", function (event) {
                event.preventDefault();
                // Obtén los valores de los campos de entrada
                var User = document.getElementById("UserInput").value;
                var Victorias = parseInt("0");

                // Agrega los datos a Firestore
                db.collection("Usuarios").add({
                    User: User,
                    Victorias: Victorias
                })
                    .then(function (docRef) {
                        // Reinicia el formulario
                        document.getElementById("AgregarJugador").reset();
                        // Opcional: Muestra un mensaje de éxito
                        alert("Elemento agregado correctamente");

                        // Crea el botón del nuevo jugador
                        createPlayerButton(User, Victorias);
                    })
                    .catch(function (error) {
                        // Opcional: Muestra un mensaje de error
                        console.error("Error al agregar elemento: ", error);
                    });
            });
        } else {
            console.log("El elemento con el id 'AgregarJugador' no se encontró en el DOM.");
        }
    }
    agregarElementoFirestore();
    // Recuperar los jugadores existentes desde la base de datos y crear los botones correspondientes
    db.collection("Usuarios").get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            var jugador = doc.data();
            // Crea un nuevo botón de jugador con los datos recuperados
            createPlayerButton(jugador.User, jugador.Victorias);
        });
    });
}

function actualizarCampo(ID) {

    var documentoId = ID; // Reemplaza con el ID del documento que deseas actualizar
    var campoActualizar = "Victorias"; // Reemplaza con el nombre del campo que deseas actualizar

    // Actualizar el campo específico del documento en Firestore
    db.collection("Usuarios").doc(documentoId).update({
        [campoActualizar]: firebase.firestore.FieldValue.increment(1)
    })
        .then(function () {
            console.log("Campo actualizado en el documento:", documentoId);
            alert("GANASTE");
            // Realiza las acciones necesarias después de actualizar el campo
        })
        .catch(function (error) {
            console.error("Error al actualizar el campo:", error);
        });
}

function obtenerIdDocumento(ID) {
    return new Promise(function (resolve, reject) {
        var campoBuscar = "User"; // Reemplaza con el nombre del campo que tienes
        var valorBuscar = ID; // Reemplaza con el valor del campo que tienes

        db.collection("Usuarios").where(campoBuscar, "==", valorBuscar)
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    var documentoId = doc.id;
                    console.log("ID del documento:", documentoId);

                    // Resuelve la promesa con el valor del documentoId
                    resolve(documentoId);
                });
            })
            .catch(function (error) {
                // Rechaza la promesa con el error
                reject(error);
            });
    });
}