//import Images from './Images'
import {CardGroup,Card, Button} from "react-bootstrap"

function SchermataPrincipaleGestoreParcheggio(){
  if(JSON.parse(window.sessionStorage.getItem("utente"))){
    if(JSON.parse(window.sessionStorage.getItem("utente")).Ruolo==="Cliente"){
        window.location.href="/"
    }        
    else if(JSON.parse(window.sessionStorage.getItem("utente")).Ruolo==="Autista"){
        window.location.href="/SchermataPrincipaleAutista"
    }
    else if(JSON.parse(window.sessionStorage.getItem("utente")).Ruolo==="Amministratore"){
        window.location.href="/SchermataPrincipaleAmministratore"
    }
}
else{
    window.location.href="/Login"
}
    return(
        
        <body style={{backgroundImage: `url(${"../images/sfondoSchermate.jpg"})`}}> 
        
        <div className="container" style={{paddingTop:50, paddingBottom:50}}>
        <CardGroup>
 
  <Card style={{maxHeight:400, maxWidth:300}}>
    <Card.Img variant="top" src="../images/schermataPrincipaleAmministratorePren.png" style={{maxHeight:400, maxWidth:300}}/>
    <Card.Body style={{maxHeight:400, maxWidth:300}}>
      <Card.Title>Gestione Prenotazioni parcheggio</Card.Title>
      <Card.Text>
      Da qui è possibile vedere le partenze e gli arrivi dei mezzi nel parcheggio ed accedervi
      </Card.Text>
    </Card.Body>
    <Card.Footer style={{maxHeight:400, maxWidth:300}}>
      <small className="text-muted">
      <Button variant="primary" href="/SchermataGestionePrenotazioni">Corse parcheggio</Button>

      </small>
    </Card.Footer>
  </Card>
</CardGroup>
        </div>
    
        </body>
        
       
    )
}

export default SchermataPrincipaleGestoreParcheggio;