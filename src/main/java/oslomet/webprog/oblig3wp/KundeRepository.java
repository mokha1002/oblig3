package oslomet.webprog.oblig3wp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;


//Repository-klassen for å utføre databaseoperasjoner knyttet til Kunde-entiteten.
@Repository
public class KundeRepository {

    @Autowired
    private JdbcTemplate db;

    // Metode for å lagre en ny kunde i databasen.
    public void lagreKunde(Kunde innKunde){
        // SQL-spørring for å sette inn kundedata i databasen.
        String sql = "INSERT INTO Kunde (film, antall, fornavn, etternavn, telefonnr, epost) VALUES(?,?,?,?,?,?)";
        // Utfører spørringen med kundedata som parameter.
        db.update(sql, innKunde.getFilm(), innKunde.getAntall(), innKunde.getFornavn(), innKunde.getEtternavn(), innKunde.getTelefonnr(), innKunde.getEpost());
    }

    // Metode for å hente alle kunder fra databasen.
    public List<Kunde> hentKunder(){
        // SQL-spørring for å hente alle kunder.
        String sql = "SELECT * FROM Kunde";
        // Utfører spørringen og mapper resultatet til en liste av Kunde-objekter ved hjelp av BeanPropertyRowMapper.
        List<Kunde> alleKunder = db.query(sql, new BeanPropertyRowMapper(Kunde.class));
        return alleKunder;
    }

    // Metode for å slette alle kunder fra databasen.
    public void slettKunder(){
        // SQL-spørring for å slette alle kunder fra tabellen.
        String sql = "DELETE FROM Kunde";
        // Utfører spørringen for å slette alle kunder.
        db.update(sql);
    }
}
