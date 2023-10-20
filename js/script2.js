// Funzione per caricare il file XML
function loadXMLDoc() {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            parseXML(this);
        }
    };

    xmlhttp.open("GET", "canali.xml", true);
    xmlhttp.send();
}

// Funzione per analizzare il file XML e generare la tabella per il Canale 2
function parseXML(xml) {
    var xmlDoc = xml.responseXML;
    var table = "<thead><tr><th>Ora Inizio</th><th>Ora Fine</th><th>Nome Programma</th><th>Preview</th></tr></thead>";

    var canale2 = xmlDoc.getElementsByTagName("Canale2")[0];
    var programmi = canale2.getElementsByTagName("Programma");

    for (var j = 0; j < programmi.length; j++) {
        var oraInizio = programmi[j].getElementsByTagName("OraInizio")[0].textContent;
        var oraFine = programmi[j].getElementsByTagName("OraFine")[0].textContent;
        var nomeProgramma = programmi[j].getElementsByTagName("NomeProgramma")[0].textContent;

        var imgElement = programmi[j].getElementsByTagName("Img")[0];
        var imgSrc = imgElement ? imgElement.textContent : "";

        table += "<tr><td>" + oraInizio + "</td><td>" + oraFine + "</td><td>" + nomeProgramma + "</td><td><img class='img-small' src='" + imgSrc + "'></td></tr>";
    }

    document.getElementById("programmiTable").innerHTML = "<table>" + table + "</table>";
}

// Carica il file XML quando la pagina si carica
window.onload = loadXMLDoc;

