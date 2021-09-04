import {Navbar, Container,Nav} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function Navigazione(){
  return(
    <>    
    
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Container>
  
  <Navbar.Brand href="/"><font color="blue" size="5">Stop And Go Pag</font></Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="me-auto">
    
      
    </Nav>
    <Nav>
      <Nav.Link href="/SchermataDiRegistrazione">Registrati</Nav.Link>
      <Nav.Link eventKey={2} href="/Login">
        Accedi
      </Nav.Link>
    </Nav>
  </Navbar.Collapse>
  </Container>
</Navbar>
 
   </>
  )
}

export default Navigazione