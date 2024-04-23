package oslomet.webprog.oblig3wp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class KundeController {

    @Autowired
    KundeRepository rep;

    @PostMapping("/lagre")
    public void lagreKunde(Kunde innKunde){
        rep.lagreKunde(innKunde);
    }

    @GetMapping("/hent")
    public List<Kunde> hentAlleKunder(){
        return rep.hentKunder();
    }

    @GetMapping("/slett")
    public void slettAlle(){
        rep.slettKunder();
    }
}
