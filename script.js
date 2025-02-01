document.addEventListener("DOMContentLoaded", function () {
    // Forza il testo in maiuscolo mentre l'utente scrive nella textarea
    const textarea = document.querySelector(".TestoParola");
    textarea.addEventListener("input", function () {
        textarea.value = textarea.value.toUpperCase();
    });

    // Funzione per applicare il cifrario di Cesare
    function cifraCesare(testo, chiave, codifica = true) {
        const alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        let risultato = "";

        // Se è decodifica, invertiamo la chiave
        if (!codifica) {
            chiave = (26 - chiave) % 26;
        }

        // Iteriamo attraverso ogni carattere del testo
        for (let i = 0; i < testo.length; i++) {
            const char = testo[i];
            if (alfabeto.includes(char)) {
                // Trova l'indice del carattere nell'alfabeto
                const indice = alfabeto.indexOf(char);
                // Applica la chiave
                const nuovoIndice = (indice + chiave) % 26;
                risultato += alfabeto[nuovoIndice];
            } else {
                // Mantieni i caratteri non alfabetici (es. spazi, punteggiatura)
                risultato += char;
            }
        }

        return risultato;
    }

    // Gestore evento per il bottone "Invio"
    document.querySelector("form").addEventListener("submit", function (e) {
        e.preventDefault();

        // Ottieni i valori dall'interfaccia
        const testo = document.querySelector(".TestoParola").value.toUpperCase();  // Il testo è già in maiuscolo grazie all'evento input
        const chiave = parseInt(document.querySelector(".scletaNumero").value);
        const codifica = document.querySelector("#radio1").checked;
        const decodifica = document.querySelector("#radio2").checked;

        // Verifica se la chiave è valida
        if (isNaN(chiave) || chiave < 0 || chiave > 25) {
            alert("Inserisci una chiave valida tra 0 e 25!");
            return;
        }

        // Verifica che sia selezionata almeno una delle opzioni
        if (!codifica && !decodifica) {
            alert("Seleziona Codifica o Decodifica!");
            return;
        }

        // Determina l'operazione: cifrare o decifrare
        const risultato = cifraCesare(testo, chiave, codifica);


        // Verifica che l'elemento 'risultatoTesto' esista nel DOM
        if (risultatoTesto) {
            risultatoTesto.textContent = risultato;
            risultatoDiv.style.display = "block"; // Assicurati che il risultato sia visibile
        } else {
            console.error("Elemento 'risultatoTesto' non trovato nel DOM!");
        }

        // Mostra il bottone per ricaricare la pagina
        document.getElementById("ricaricaBtn").style.display = "block";
    });
});

function openPopup() {
    let testo = document.getElementById("risultatoTesto").innerHTML;

    Swal.fire({
        title: 'Risultato!',
        html : document.getElementById("risultatoTesto"),
        icon: 'success',
        confirmButtonText: 'EXIT',
        allowOutsideClick: false,
        preConfirm: () => {
            location.reload(); // Ricarica la pagina quando si preme il bottone
        }
        });
}