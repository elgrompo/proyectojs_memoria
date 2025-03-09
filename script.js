let tiempoTotal = null;
let vidaTotal = null;
let numeroDeParejas = null;
let puntacionDeParejas = 0;
let arrayRepertorio = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
let arrayCartas = [];
let cartaGirada = true;
let primeraCarta = null;
let segundaCarta = null;
let configuracionValida = true;

let sonidoActivado = true;
let sonidoGirarCarta = new Audio("sound/girarCarta.mp3");
let musicaDeFondo = new Audio("sound/musica.mp3");
let sonidoAcierto = new Audio("sound/acierto.mp3");
let sonidoError = new Audio("sound/error.mp3");

function activarMusica() {
  if (sonidoActivado) {
    musicaDeFondo.loop = true;
    musicaDeFondo.play();
  }
}
function sonidoDeAcierto() {
  if (sonidoActivado) {
    sonidoAcierto.play();
  }
}
function sonidoDeError() {
  if (sonidoActivado) {
    sonidoError.play();
  }
}
function sonidoGirar() {
  if (sonidoActivado) {
    sonidoGirarCarta.play();
  }
}

function borrarContenido() {
  document.body.innerHTML = "";
}

function pedirVidas() {
  vidaTotal = prompt("Seleccione el número de vidas con el que quiere jugar");
  vidaTotal = parseInt(vidaTotal);
  if (isNaN(vidaTotal) || vidaTotal < 0 || vidaTotal === "") {
    alert(
      "No has seleccionado un número de vidas válido, no se puede jugar así"
    );
    alert("Si desea volver a intentarlo, pulse aceptar");
    configuracionValida = false;
    location.reload();
    return;
  }
}
function pedirTiempo() {
  tiempoTotal = prompt("Seleccione el tiempo de juego en segundos");
  tiempoTotal = parseInt(tiempoTotal);
  if (
    isNaN(tiempoTotal) ||
    tiempoTotal < 0 ||
    tiempoTotal === "" ||
    configuracionValida === false
  ) {
    alert("No has seleccionado un tiempo válido, no se puede jugar así");
    alert("Si desea volver a intentarlo, pulse aceptar");
    configuracionValida = false;
    location.reload();
    return;
  }
}
function pedirParejas() {
  numeroDeParejas = prompt(
    "Seleccione el número de parejas con las que quiere jugar (DE 1 A 12)"
  );

  if (
    isNaN(numeroDeParejas) ||
    numeroDeParejas < 0 ||
    numeroDeParejas > 12 ||
    (numeroDeParejas === "" && configuracionValida === false)
  ) {
    alert(
      "No has seleccionado un número de parejas válido, no se puede jugar así"
    );
    alert("Si desea volver a intentarlo, pulse aceptar");
    configuracionValida = false;
    location.reload();
    return;
  }
}

function crearParejas() {
  for (let i = 0; i < numeroDeParejas; i++) {
    let carta =
      arrayRepertorio[Math.floor(Math.random() * arrayRepertorio.length)];
    arrayCartas.push(carta);
    arrayCartas.push(carta);
  }
  arrayCartas.sort(() => Math.random() - 0.5);
}
function girarCarta(carta) {
  if (
    carta.src.includes("cartaGirada.png") &&
    carta.style.border !== "5px solid red"
  ) {
    if (primeraCarta === null && segundaCarta === null) {
      primeraCarta = carta;
      {
        primeraCarta.src = carta.className;
        carta.style.border = "5px solid red";
        sonidoGirar();
      }
    } else if (primeraCarta !== null && segundaCarta === null) {
      segundaCarta = carta;
      {
        segundaCarta.src = carta.className;
        carta.style.border = "5px solid red";
        sonidoGirar();
      }
    }

    if (primeraCarta.className !== segundaCarta.className) {
      setTimeout(function () {
        vidaTotal--;
        primeraCarta.style.border = "none";
        segundaCarta.style.border = "none";
        document.getElementById(primeraCarta.id).src = "img/cartaGirada.png";
        document.getElementById(segundaCarta.id).src = "img/cartaGirada.png";
        primeraCarta = null;
        segundaCarta = null;
      }, 1000);

      sonidoDeError();
    } else {
      puntacionDeParejas++;

      primeraCarta.style.border = "5px solid green";
      segundaCarta.style.border = "5px solid green";
      primeraCarta = null;
      segundaCarta = null;
      sonidoDeAcierto();
    }
  }
}

function ponerCartasComoImagenes() {
  for (let i = 0; i < arrayCartas.length; i++) {
    let carta = document.createElement("img");
    carta.src = "img/carta" + arrayCartas[i] + ".png";
    carta.id = "carta" + i;
    carta.className = "img/carta" + arrayCartas[i] + ".png";

    carta.addEventListener("click", function () {
      girarCarta(carta);
    });
    document.getElementById("tablero").appendChild(carta);
  }
}

function ponerCartas() {
  crearParejas();
  ponerCartasComoImagenes();
}
accionDeGirarLaCarta = function (carta) {
  carta.src = "img/cartaGirada.png";
};
function girarTodasLasCartas() {
  for (let i = 0; i < arrayCartas.length; i++) {
    let carta = document.getElementById("carta" + i);
    setTimeout(function () {
      accionDeGirarLaCarta(carta);
    }, 500 + i * 300);
  }
}
function crearTablero() {
  let contadores = document.createElement("div");
  contadores.id = "contadores";
  let contenedorTablero = document.createElement("div");
  contenedorTablero.id = "contenedorTablero";
  let tablero = document.createElement("div");
  tablero.id = "tablero";

  let botonDeSonido = document.createElement("button");
  botonDeSonido.id = "botonSonido";
  botonDeSonido.textContent = "🔊";
  botonDeSonido.addEventListener("click", function () {
    if (sonidoActivado) {
      sonidoActivado = false;
      botonDeSonido.textContent = "🔇";
      musicaDeFondo.pause();
    } else {
      sonidoActivado = true;
      botonDeSonido.textContent = "🔊";
      musicaDeFondo.play();
    }
  });
  contadores.appendChild(botonDeSonido);
  let botonDeReinicio = document.createElement("button");
  botonDeReinicio.id = "botonReinicio";
  botonDeReinicio.textContent = "🔄";
  botonDeReinicio.addEventListener("click", function () {
    location.reload();
  });
  contadores.appendChild(botonDeReinicio);

  let botonModoOscuro = document.createElement("button");
  botonModoOscuro.id = "botonModoOscuro";
  botonModoOscuro.textContent = "🌙";

  botonModoOscuro.addEventListener("click", function () {
    if (document.body.style.backgroundColor === "black") {
      document.body.style.backgroundColor = "white";
      document.documentElement.style.backgroundColor = "white";
      document.body.style.color = "black";
      botonModoOscuro.textContent = "🌙";
    } else {
      document.body.style.backgroundColor = "black";
      document.documentElement.style.backgroundColor = "black";
      botonModoOscuro.textContent = "☀️";
    }
  });

  contadores.appendChild(botonModoOscuro);

  let contadorDeVidas = document.createElement("h1");
  contadorDeVidas.textContent = "Vidas: " + vidaTotal;

  let contadorDeParejas = document.createElement("h1");
  contadorDeParejas.textContent = "Parejas: " + puntacionDeParejas;

  let contadorDeTiempo = document.createElement("h1");
  contadorDeTiempo.textContent = "Tiempo: " + tiempoTotal;
  contadorDeVidas.id = "contadorDeVidas";
  contadorDeParejas.id = "contadorDeParejas";
  contadorDeTiempo.id = "contadorDeTiempo";

  contadores.appendChild(contadorDeVidas);
  contadores.appendChild(contadorDeParejas);
  contadores.appendChild(contadorDeTiempo);
  setInterval(function () {
    tiempoTotal--;
    contadorDeVidas.textContent = "❤️: " + vidaTotal;
    contadorDeParejas.textContent = "✅: " + puntacionDeParejas;
    contadorDeTiempo.textContent = "🕒: " + tiempoTotal;
  }, 1000);

  contenedorTablero.appendChild(tablero);
  document.body.appendChild(contadores);
  document.body.appendChild(contenedorTablero);
}
function perdidoOganado() {
  setInterval(function () {
    if (tiempoTotal === 0) {
      alert("Has perdido");
      location.reload();
      return;
    }
    if (vidaTotal === 0) {
      alert("Has perdido");
      location.reload();
      return;
    }
    if (puntacionDeParejas === parseInt(numeroDeParejas)) {
      alert("Has ganado");
      location.reload();
      return;
    }
  }, 1000);
}
pedir = function () {
  pedirVidas();
  if (configuracionValida === false) {
    return;
  }
  pedirTiempo();
  if (configuracionValida === false) {
    return;
  }
  pedirParejas();
  if (configuracionValida === false) {
    return;
  }
};
function jugar() {
  pedir();
  borrarContenido();
  crearTablero();
  activarMusica();
  ponerCartas();
  girarTodasLasCartas();
  perdidoOganado();
}

let botonDeEmpezar = document.getElementById("botonEmpezar");
botonDeEmpezar.addEventListener("click", jugar);

let botonSonido = document.getElementById("botonSonido");
