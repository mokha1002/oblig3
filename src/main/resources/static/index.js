/*
Function for å hente data fra inputfeltene og sende det til serveren for lagring.
*/
function hentData () {
    // Lager et Kunde-objekt med dataene fra inputfeltene
    const Kunde = {
        film: $("#bestilling").val(),
        antall: $("#antall").val(),
        fornavn: $("#fornavn").val(),
        etternavn: $("#etternavn").val(),
        telefonnr: $("#telefonnr").val(),
        epost: $("#epost").val()
    }

    // Henter verdien fra inputfeltene
    let antall = $("#antall").val();
    let fornavn = $("#fornavn").val();
    let etternavn = $("#etternavn").val();
    let telefonnr = $("#telefonnr").val();
    let epost = $("#epost").val();

    // Validering av inputdata
    let antallValidering = antall !== "" && !isNaN(antall) && antall > 0;
    let fornavnValidering = fornavn !== "";
    let etternavnValidering = etternavn !== "";
    let telefonnrValidering = telefonnr !== "" && !isNaN(telefonnr) && telefonnr.length === 8;
    let epostpattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Regex mønster for epostvalidering
    let epostValidering = epostpattern.test(epost);

    // Hvis alle valideringsreglene er oppfylt, send dataen til serveren for lagring
    if (antallValidering && fornavnValidering && etternavnValidering && telefonnrValidering && epostValidering) {
        // Sender dataen til serveren for lagring via AJAX-postforespørsel
        $.post("/lagre", Kunde, function () {
            // Oppdaterer listen over kunder etter lagring
            hentAlleKunder();
        });
        // Nullstiller inputfeltene etter lagring
        $("#bestilling").val("");
        $("#antall").val("");
        $("#fornavn").val("");
        $("#etternavn").val("");
        $("#telefonnr").val("");
        $("#epost").val("");
    } else {
        // Viser feilmeldinger for hver valideringsregel som ikke er oppfylt
        if (antall === "") {
            document.getElementById("feilAntall").innerText = "Skriv inn antallet billetter";
        } else if (antallValidering === false) {
            document.getElementById("feilAntall").innerText = "Dette er et ugyldig antall";
        } else {
            document.getElementById("feilAntall").innerText = "";
        }
        if (fornavn === "") {
            document.getElementById("feilFornavn").innerText = "Skriv inn fornavnet";
        } else {
            document.getElementById("feilFornavn").innerText = "";
        }
        if (etternavn === "") {
            document.getElementById("feilEtternavn").innerText = "Skriv inn etternavnet";
        } else {
            document.getElementById("feilEtternavn").innerText = "";
        }
        if (telefonnr === "") {
            document.getElementById("feilTlf").innerText = "Skriv inn telefonnummeret";
        } else if (telefonnrValidering === false) {
            document.getElementById("feilTlf").innerText = "Ugyldig telefonnummer, nummeret må ha 8 siffer";
        } else {
            document.getElementById("feilTlf").innerText = "";
        }
        if (epost === "") {
            document.getElementById("feilEpost").innerText = "Skriv inn eposten";
        } else if (!epostValidering) {
            document.getElementById("feilEpost").innerText = "Dette er en ugyldig epost";
        } else {
            document.getElementById("feilEpost").innerText = "";
        }
    }
}


//funksjon for å hente alle kunder fra serveren.
function hentAlleKunder(){
    // Sender en GET-forespørsel til serveren for å hente alle kunder
    $.get("/hent", function(data) {
        // Formaterer og viser dataen
        formaterData(data);
    });
}


//funksjon for å formatere og vise kundedata i en tabell.
function formaterData(kunder){
    // Oppretter HTML for en tabell og legger til overskrifter
    let ut = "<table class='table table-striped'><tr><th>Film</th><th>Antall</th><th>Fornavn</th><th>Etternavn</th><th>Telefonnummer</th><th>Epost</th></tr>";
    // Går gjennom hver kunde og legger til rader i tabellen
    for (const kunde of kunder){
        ut+="<tr><td>"+kunde.film+"</td><td>"+kunde.antall+"</td><td>"+kunde.fornavn+"</td><td>"+kunde.etternavn+"</td><td>"+kunde.telefonnr+"</td><td>"+kunde.epost+"</td></tr>";
    }
    // Avslutter tabellen
    ut+="</table>";
    // Setter tabellen inn i HTML-elementet med id "utskriftFilmArray"
    $("#utskriftFilmArray").html(ut);
}


//funksjon for å slette alle kunder.
function slettKunder(){
    // Sender en GET-forespørsel til serveren for å slette alle kunder
    $.get("/slett", function (){
        // Henter og viser alle kunder på nytt etter sletting
        hentAlleKunder();
    })
}

