// ==UserScript==
// @name         Leitstellenspiel POI Zähler
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Fügt einen Button hinzu, um POIs zu zählen und sie in einer Tabelle anzuzeigen.
// @author       MissSobol
// @match        https://www.leitstellenspiel.de/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Funktion zum Erstellen des Buttons
    function createButton() {
        const newButton = document.createElement('button');
        newButton.textContent = 'Zähle POIs';
        newButton.style.position = 'fixed';
        newButton.style.bottom = '10px';
        newButton.style.left = '10px';
        newButton.addEventListener('click', countAndDisplayPOIs);
        document.body.appendChild(newButton);
    }

    // Funktion zum Zählen der POIs und Anzeigen in einer Tabelle
    function countAndDisplayPOIs() {
        // Zählt die POIs und speichert sie in einem Objekt
        const poiCounts = map_pois_service.getMissionPoiMarkersArray().map(poi => poi.getTooltip().getContent()).reduce((a, b) => (a[b] = (a[b] ?? 0) + 1, a), {});
        
        // Erstellt eine Tabelle für die Anzeige der POIs
        const poiTable = document.createElement('table');
        const headerRow = poiTable.insertRow();
        const headerCell1 = headerRow.insertCell();
        const headerCell2 = headerRow.insertCell();
        headerCell1.textContent = 'POI Typ';
        headerCell2.textContent = 'Anzahl';

        // Füllt die Tabelle mit den gezählten POIs
        for (const poiType in poiCounts) {
            const row = poiTable.insertRow();
            const cell1 = row.insertCell();
            const cell2 = row.insertCell();
            cell1.textContent = poiType;
            cell2.textContent = poiCounts[poiType];
        }

        // Öffnet ein neues Fenster und fügt die Tabelle hinzu
        const newWindow = window.open();
        newWindow.document.body.appendChild(poiTable);
    }

    // Ruft die Funktion zum Erstellen des Buttons auf
    createButton();
})();
