package oslomet.webprog.oblig3wp;

public class Kunde {
    private String film, fornavn, etternavn, epost, telefonnr;
    private int antall;

    public Kunde(String film, String fornavn, String etternavn, String epost, String telefonnr, int antall){
        this.film = film;
        this.fornavn = fornavn;
        this.etternavn = etternavn;
        this.antall = antall;
        this. telefonnr = telefonnr;
        this.epost = epost;
    }

    public Kunde(){ }
    public String getFilm() {
        return film;
    }

    public void setFilm(String film) {
        this.film = film;
    }

    public String getFornavn() {
        return fornavn;
    }

    public void setFornavn(String fornavn) {
        this.fornavn = fornavn;
    }

    public String getEtternavn() {
        return etternavn;
    }

    public void setEtternavn(String etternavn) {
        this.etternavn = etternavn;
    }

    public String getEpost() {
        return epost;
    }

    public void setEpost(String epost) {
        this.epost = epost;
    }

    public String getTelefonnr() {
        return telefonnr;
    }

    public void setTelefonnr(String telefonnr) {
        this.telefonnr = telefonnr;
    }

    public int getAntall() {
        return antall;
    }

    public void setAntall(int antall) {
        this.antall = antall;
    }
}
