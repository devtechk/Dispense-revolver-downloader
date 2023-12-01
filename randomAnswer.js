// ==UserScript==
// @name         Random answer 
// @namespace    http://tampermonkey.net/
// @version      0.3
// @description  Cambia l'ordinamento delle domande dei test di fine lezione
// @author       You
// @match        https://lms-courses.pegaso.multiversity.click/main/lp-video_student_view/lesson_student_view.php*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=multiversity.click
// @grant        none
// @license MIT
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==
/* global $ */

(function () {
    'use strict';
    //RANDOM BOXES START
    function randomBoxes() {
        // Funzione per mischiare gli elementi di un array
        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        }

        // Ottieni tutti gli elementi con classe "panel-default"
        const panels = $('.col-md-8  .panel-default');

        // Converti gli elementi jQuery in un array JavaScript
        const panelsArray = $.makeArray(panels);

        // Mischia l'array di pannelli
        shuffleArray(panelsArray);

        // Rimuovi tutti i pannelli dal documento
        $('.col-md-8 .panel-default').remove();

        // Aggiungi i pannelli in ordine casuale al documento
        panelsArray.forEach(panel => {
            $('.col-md-8').append(panel);
        });
    }
    //RANDOME BOXES END
    $("#main-contents").append("<button id='downloadDispenze' class='scriptBtn'>Random order</button>");
    $('#downloadDispenze').on('click', function () {
        // Chiamare la funzione per mescolare le righe delle tabelle
        shuffleTableRows();
        randomBoxes();

    });
    // Funzione per generare un numero casuale compreso tra min e max
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Funzione per mescolare un array
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = getRandomInt(0, i);
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Funzione per mescolare le righe delle tabelle
    function shuffleTableRows() {
        // Seleziona tutte le tabelle con la classe "table-hover"
        const tables = document.querySelectorAll('.table-hover');

        // Per ogni tabella, mescola le righe nella sezione del corpo
        tables.forEach((table) => {
            const tbody = table.querySelector('tbody');
            const rows = Array.from(tbody.children);

            // Mescola le righe
            shuffleArray(rows);

            // Rimuovi le righe esistenti dalla tabella
            rows.forEach((row) => {
                tbody.removeChild(row);
            });

            // Aggiungi le righe mescolate alla tabella
            rows.forEach((row) => {
                tbody.appendChild(row);
            });
        });
    }


})();
const injectCSS = css => {
    let el = document.createElement('style');
    el.type = 'text/css';
    el.innerText = css;
    document.head.appendChild(el);
    return el;
};

injectCSS(`
     .scriptBtn {
        margin: 10px 10px 20px 0;
        background-color: #a42c52;
        font-style: italic;
        color: white;
        border: none;
        border-radius: 10px;
        padding: 10px;
        box-shadow: 5px 5px 8px -5px rgba(0,0,0,0.69);
        top: 100px;
        position: absolute;
        left: 540px;
     }
  
  `);
