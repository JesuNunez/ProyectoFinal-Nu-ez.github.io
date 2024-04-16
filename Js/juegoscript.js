const deckUrl = "https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1";
const Pedirbtn = document.querySelector(".Pedir");
const cardsContainer = document.querySelector(".cartas");
const main = document.querySelector("main");
const mensaje = document.querySelector(".mensaje");
const Devuelta = document.querySelector(".Devuelta");
const Plantarsebtn = document.querySelector(".Plantarse");
const cruceroContainer = document.querySelector(".cartas-crucero");
let cruceroTotal = 0;
let deckId;
let total = 0;

async function getDeck(){
    const response = await fetch(deckUrl);
    const deckDetails = await response.json();
    deckId = deckDetails.deck_id;
    startCrucero();
}

getDeck();

function reiniciarJuego() {
    total = 0;
    cruceroTotal = 0;
    mensaje.textContent = "";
    cardsContainer.innerHTML = "";
    cruceroContainer.innerHTML = "";
    cruceroContainer.style.display = "none"; 
    startCrucero();
}

function mostrarAlerta(icono, titulo, mensaje, footer) {
    Swal.fire({
        icon: icono,
        title: titulo,
        text: mensaje,
        footer: footer,
        showCancelButton: true, 
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Jugar de nuevo'
    }).then((result) => {
        if (result.isConfirmed) {
            reiniciarJuego();
        }
    });
}

Pedirbtn.onclick = async function () {
    const cardUrl = `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`;
    const response = await fetch(cardUrl);
    const card = await response.json();
    const cardDetails = card.cards[0];
    cardsContainer.innerHTML += `<img src="${cardDetails.image}" alt="${cardDetails.value} of ${cardDetails.suit}">`
    if(cardDetails.value === "QUEEN" || cardDetails.value ==="KING" || cardDetails.value ==="JACK"){
        total += 10;
    }
    else if(cardDetails.value === "ACE" && (total + 11) <= 21){
        total += 11;
    }
    else if(cardDetails.value === "ACE"){
        total += 1;
    }
    else {
        total += parseInt(cardDetails.value);
    }
    if(total > 21){
        mostrarAlerta("error", "¡Te has pasado!", "¡Has perdido! Puntuación: " + total, "El crucero tenía " + cruceroTotal + " puntos");
    }
}

Devuelta.onclick = function(){
    total = 0;
    cardsContainer.innerHTML = "";
    main.style.filter = "blur(0px)";
    mensaje.style.display = "none";
}

cruceroContainer.style.display = "none";

Plantarsebtn.onclick = async function () {
    if (total <= 21) {
        while (cruceroTotal < 17) {
            const cardUrl = `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`;
            const responseCards = await fetch(cardUrl);
            const card = await responseCards.json();
            const cardDetails = card.cards[0];

            cruceroContainer.innerHTML += `<img src="${cardDetails.image}" alt="${cardDetails.value} of ${cardDetails.suit}">`;

            if (cardDetails.value === "QUEEN" || cardDetails.value === "KING" || cardDetails.value === "JACK") {
                cruceroTotal += 10;
            } else if (cardDetails.value === "ACE" && (cruceroTotal + 11) <= 21) {
                cruceroTotal += 11;
            } else if (cardDetails.value === "ACE") {
                cruceroTotal += 1;
            } else {
                cruceroTotal += parseInt(cardDetails.value);
            }
        }
    }
    cruceroContainer.style.display = "block";

if (total > 21) {
    
    mostrarAlerta("error", "¡Has perdido!", "¡Has perdido! Puntuación: " + total, "El crucero tenía " + cruceroTotal + " puntos");
} else if (cruceroTotal > 21 || total > cruceroTotal) {
    
    mostrarAlerta("success", "¡Has ganado!", "¡Has ganado! Puntuación: " + total, "El crucero tenía " + cruceroTotal + " puntos");
} else if (total < cruceroTotal) {
    
    mostrarAlerta("error", "¡Has perdido!", "¡Has perdido! Puntuación: " + total, "El crucero tenía " + cruceroTotal + " puntos");
} else {
    
    mostrarAlerta("info", "¡Empate!", "¡Empate! Puntuación: " + total, "El crucero tenía " + cruceroTotal + " puntos");
}
 
}

async function startCrucero() {
    const response = await fetch(deckUrl);
    const deckDetails = await response.json();
    const cruceroDeckId = deckDetails.deck_id;

    while (cruceroTotal < 17) {
        const cardUrl = `https://www.deckofcardsapi.com/api/deck/${cruceroDeckId}/draw/?count=1`;
        const responseCards = await fetch(cardUrl);
        const card = await responseCards.json();
        const cardDetails = card.cards[0];

        cruceroContainer.innerHTML += `<img src="${cardDetails.image}" alt="${cardDetails.value} of ${cardDetails.suit}">`;

        if (cardDetails.value === "QUEEN" || cardDetails.value === "KING" || cardDetails.value === "JACK") {
            cruceroTotal += 10;
        } else if (cardDetails.value === "ACE" && (cruceroTotal + 11) <= 21) {
            cruceroTotal += 11;
        } else if (cardDetails.value === "ACE") {
            cruceroTotal += 1;
        } else {
            cruceroTotal += parseInt(cardDetails.value);
        }
    }

}

startCrucero();
