function hentData () {
    const Kunde = {
        film: $("#bestilling").val(),
        antall: $("#antall").val(),
        fornavn: $("#fornavn").val(),
        etternavn: $("#etternavn").val(),
        telefonnr: $("#telefonnr").val(),
        epost: $("#epost").val()
    }

    let antall = document.getElementById("antall").value;
    let fornavn = document.getElementById("fornavn").value;
    let etternavn = document.getElementById("etternavn").value;
    let telefonnr = document.getElementById("telefonnr").value;
    let epost = document.getElementById("epost").value;

    let antallValidering = antall !== "" && !isNaN(antall) && antall > 0;
    let fornavnValidering = fornavn !== "";
    let etternavnValidering = etternavn !== "";
    let telefonnrValidering = telefonnr !== "" && !isNaN(telefonnr) && telefonnr.length === 8;
    let epostpattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // epostvalidering fra: https://www.geeksforgeeks.org/javascript-program-to-validate-an-email-address/
    let epostValidering = epostpattern.test(epost);

    if (antallValidering && fornavnValidering && etternavnValidering && telefonnrValidering && epostValidering) {
        $.post("/lagre", Kunde, function () {
            hentAlleKunder();
        });
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
function hentAlleKunder(){
    $.get("/hent", function(data) {
        formaterData(data);
    });
}
function formaterData(kunder){
    let ut = "<table><tr><th>Film</th><th>Antall</th><th>Fornavn</th><th>Etternavn</th><th>Telefonnummer</th><th>Epost</th></tr>";
    for (const kunde of kunder){
        ut+="<tr><td>"+kunde.film+"</td><td>"+kunde.antall+"</td><td>"+kunde.fornavn+"</td><td>"+kunde.etternavn+"</td><td>"+kunde.telefonnr+"</td><td>"+kunde.epost+"</td></tr>";
    }
    ut+="</table>";
    $("#utskriftFilmArray").html(ut); 
}

function slettKunder(){
    $.get("/slett", function (){
        hentAlleKunder();
    })
}