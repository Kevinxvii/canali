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

function parseXML(xml) {
    var xmlDoc = xml.responseXML;
    var table = "<table><thead><tr><th>Canale</th><th>Ora Inizio</th><th>Ora Fine</th><th>Nome Programma</th><th>Preview</th></tr></thead>";

    var imgCounter = 0;

    for (var i = 0; i < 4; i++) {
        var canali = xmlDoc.getElementsByTagName("Canale" + (i + 1));
        for (var j = 0; j < canali.length; j++) {
            var nomeCanale = canali[j].getElementsByTagName("nome")[0].textContent;
            var programmi = canali[j].getElementsByTagName("Programma");

            for (var k = 0; k < programmi.length; k++) {
                var oraInizio = programmi[k].getElementsByTagName("OraInizio")[0].textContent;
                var oraFine = programmi[k].getElementsByTagName("OraFine")[0].textContent;
                var nomeProgramma = programmi[k].getElementsByTagName("NomeProgramma")[0].textContent;

                var imgElement = programmi[k].getElementsByTagName("Img")[0];
                var imgSrc = imgElement ? imgElement.textContent : "";
                var imgId = "img" + imgCounter;

                table += "<tbody><tr><td>" + nomeCanale + "</td><td>" + oraInizio + "</td><td>" + oraFine + "</td><td>" + nomeProgramma + "</td><td><img class='img-small' id='" + imgId + "' src='" + imgSrc + "'></td></tr></tbody>";

                imgCounter++;
            }
        }
    }

    document.getElementById("programmiTable").innerHTML = table + "</table>";
}

window.onload = loadXMLDoc;
