//import cardAmministratore from "./cardAmministratore"
import {CardGroup,Card, Button} from "react-bootstrap"

function SchermataPrincipaleAmministratore(){
    return(
        <body style={{backgroundImage: `url(${"../images/sfondoSchermate.jpg"})`}}>
        
  
        <div className="container" style={{paddingTop:50, paddingBottom:50}}>
        <CardGroup>
  <Card style={{minWidth:200,maxWidth:300}}>
    <Card.Img variant="top" style={{paddingTop:30}} src="../images/schermataPrincipaleAmministratoreMezzi.png" />
    <Card.Body >
      <Card.Title>Gestione mezzi</Card.Title>
      <Card.Text>
        Da qui è possibile vedere la lista dei mezzi di cui dispone l'azienda, modificarne le caratteristiche, eliminarli o aggiungerne di nuovi.
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small className="text-muted">
      <Button variant="primary" href="../ListaMezzi">Vai a gestione mezzi</Button>{' '}
      </small>
    </Card.Footer>
  </Card>
  <Card style={{minWidth:200,maxWidth:300}}>
    <Card.Img variant="top" src="../images/schermataPrincipaleAmministratorePers.png" style={{maxHeight:180}}/>
    <Card.Body>
      <Card.Title>Gestione personale</Card.Title>
      <Card.Text>
        Da qui è possibile vedere la lista dei dipendenti, modificarne i dati personali, eliminarli dalla lista o aggiungerne di nuovi{' '}
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small className="text-muted">
      <Button variant="primary" href="../ListaDipendenti">Vai a gestione dipendenti</Button>{' '}
      </small>
    </Card.Footer>
  </Card>
  <Card style={{minWidth:200,maxWidth:300}}>
    <Card.Img variant="top" style={{paddingTop:0}} src="../images/schermataPrincipaleAmministratoreCliente.jpg" style={{maxHeight:180}} />
    <Card.Body>
      <Card.Title>Gestione clienti</Card.Title>
      <Card.Text>
      Da qui è possibile vedere la lista dei clienti, modificarne i dati personali, eliminarli dalla lista o aggiungerne di nuovi{' '}
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small className="text-muted">
      <Button variant="primary" href="../ListaClienti">Vai a gestione clienti</Button>{' '}
      </small>
    </Card.Footer>
  </Card>
  <Card style={{minWidth:200,maxWidth:300}}>
    <Card.Img variant="top" src="../images/schermataPrincipaleAmministratorePren.png" />
    <Card.Body>
      <Card.Title>Gestione Prenotazioni</Card.Title>
      <Card.Text>
      Da qui è possibile vedere le prenotazioni dei clienti, modificarne, cancellarle o aggiungerne di altre
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small className="text-muted">
      <Button variant="primary" href="../SchermataGestionePrenotazioni">Vai a gestione prenotazioni</Button>

      </small>
    </Card.Footer>
  </Card>
</CardGroup>
        </div>
    
        </body>
    )
}

export default SchermataPrincipaleAmministratore