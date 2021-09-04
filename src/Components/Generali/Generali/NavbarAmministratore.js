import {Navbar, Container,Nav} from "react-bootstrap";
import PopupSuccesso from "./PopupSuccesso";
import { useState } from "react";
const axios=require('axios')
function NavbarAmministratore(){

    const[show,setShow]=useState(false)

    function logout(){
      let utente=JSON.parse(window.sessionStorage.getItem("utente"))
      axios.post("http://localhost:5000/utente/logout",utente,{withCredentials:true})
      .then((res)=>{
          window.sessionStorage.removeItem("utente")
          setShow(true)
      }).catch((err)=>{
        console.log(err)
      })
    }

    return(
        <>
  <Navbar bg="dark" variant="dark">
    <Container>
    <Navbar.Brand href="/SchermataPrincipaleAmministratore">StopAndGoPag</Navbar.Brand>
    <Nav className="me-auto">
      <Nav.Link href="/ListaMezzi">Gestione mezzi</Nav.Link>
      <Nav.Link href="/ListaDipendenti">Gestrione personale</Nav.Link>
      <Nav.Link href="/ListaClienti">Gestrione clienti</Nav.Link>
      <Nav.Link href="/SchermataGestionePrenotazioni">Gestione prenotazioni</Nav.Link>
      <Nav.Link href="/SchermataPersonaleUtente">Dati Personali</Nav.Link>

    </Nav>   
    
  <Nav>
    
      <Nav.Link eventKey={2} onClick={logout}>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-left" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"/>
        <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>
        </svg>
      </Nav.Link>
    </Nav>

    </Container>
    </Navbar>
    <PopupSuccesso
        show={show}
        onHide={() => {setShow(false); window.location.href="/"}}  
        onConfirm={()=>{setShow(false); window.location.href="/"}}
        titolo={"Operazione completata"}
        stringAttenzione={"Logout effettuato"}
    />
</>
    )
}

export default NavbarAmministratore;