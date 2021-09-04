import {Row, Form, Button, Col, InputGroup} from "react-bootstrap"
import {useState} from 'react'
import axios from "axios";
//import Feedback from "react-bootstrap/esm/Feedback";
import '../Generali/Generali/bordi.css'
const crypto=require('crypto')

function FormGestioneDipendente(){
    const [validated, setValidated] = useState(false);
    const [ form, setForm ] = useState({})
    const [ errors, setErrors ] = useState({})

    function handleSubmit(event){
        event.preventDefault();
        var form = document.getElementById("form");
    
        if (form.checkValidity() === true && verificaPass()===true && confrontoDate()===true) {
            let crypass= crypto.createHash('sha512');
            crypass.update(document.getElementById("formGridPassword").value); // criptiamo la password
            let passEsa=crypass.digest('hex');
    
            const dipendenteReg =  {
                nome: document.getElementById("formGridNome").value,
                cognome: document.getElementById("formGridCognome").value,
                email:document.getElementById("formGridEmail").value,
                password: passEsa,
                dataNascita: document.getElementById("formGridDataNascita").value,
                codFiscale: document.getElementById("formGridCodiceFiscale").value,
                numCI: document.getElementById("formGridNumeroCartaIdentita").value,
                numPat: document.getElementById("formGridNumeroPatente").value,
                numTel: document.getElementById("formGridNumeroTelefono").value,
                iban: document.getElementById("formGridIban").value,
                tariffaOraria: document.getElementById("formGridTariffaAutista").value,
                ruolo: document.getElementById("formGridRuolo").value

            };
    
            try{
                axios.post("/dipendenti/inserisciDipendenti", dipendenteReg)
                .then((res)=>{
                    alert("DIPENDENTE INSERITO");
                    window.location.href= "/SchermataPrincipaleAmministratore"
                }
                ).catch(err =>{
                    if(err.response.status===400){
                        alert("Dipendente già inserito");
                    }else{
                        alert("ERRORE");
                    }
                });
            }
            catch(err){
                console.log(err.response.data.msg);
            }
            }
        }
    
    

function verificaPass() {
    let pass1= document.getElementById("formGridPassword").value
    let pass2= document.getElementById("formGridControlloPassword").value 
    
    if(pass1===pass2){
        console.log("password coincidenti") 
        //alert("Password coincidenti")
        return true              
    }

    else{
       // document.getElementById('formGridPassword').style.borderColor="red";
       // document.getElementById('formGridControlloPassword').style.borderColor="red";
        
        console.log(document.getElementById("formGridPassword").style)
        
        alert("Password non coincidenti")
        console.log("password errate")
        return false
    }
};


function confrontoDate(){
    let dataOdierna = new Date();
    let dataNascita = new Date(document.getElementById("formGridDataNascita").value);
    if(dataNascita.getTime()<dataOdierna.getTime()){
        console.log("Tutto ok")
        return true;
    }  
    else{
        console.log("Data errata")
        alert("La data deve essere precedente a quella odierna")

        return false;
    }
    
}

    return(
    
        <div className="container-fluid" style={{maxWidth:500, paddingBottom:10, alignContent:'center', paddingTop:10,backgroundColor:"#d6d6f5"}}>
            <div className="TitoloForm" style={{backgroundColor:"blue", textAlign:"center", color:"white", borderRadius:10}}>
            <h2>Modifica dipendente</h2>
            </div>
            <Form noValidate validated={validated} onSubmit={handleSubmit} id="form">
    <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridNome" >
        <Form.Label><strong>Nome</strong></Form.Label>
        <Form.Control type="text" placeholder="Inserisci il nome" required/>        
        </Form.Group>

        <Form.Group as={Col} controlId="formGridCognome">
        <Form.Label><strong>Cognome</strong></Form.Label>
        <Form.Control type="text" placeholder="Inserisci il cognome" required/>
        </Form.Group>
    </Row>

    <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
        <Form.Label><strong>Email</strong></Form.Label>
        <Form.Control type="email" placeholder="Inserisci email" pattern="^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$" required/>
        </Form.Group>

        
    </Row>

    <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridPassword">
        <Form.Label><strong>Password</strong></Form.Label>
        <InputGroup hasValidation>
        <Form.Control type="password" placeholder="Password" pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$" required/>
        <Form.Control.Feedback type="invalid">
             Inserire una password che contenga almeno 8 caratteri maiuscoli, minuscoli e numerici
        </Form.Control.Feedback>
        </InputGroup>                  
        </Form.Group>
       

        <Form.Group as={Col} controlId="formGridControlloPassword" >
        <Form.Label><strong>Conferma password</strong></Form.Label>
        <InputGroup hasValidation>
        <Form.Control type="password" placeholder="Password" required/>
        <Form.Control.Feedback type="invalid">
             Inserire una password che contenga almeno 8 caratteri maiuscoli, minuscoli e numerici
        </Form.Control.Feedback>
        </InputGroup>
        </Form.Group>
  
    </Row>



    <Form.Group className="mb-3" controlId="formGridDataNascita" style={{paddingTop:5}}>
        <Form.Label><strong>Data di nascita</strong></Form.Label>
        <Form.Control type="date" required/>
    </Form.Group>

    <Row className="mb-3">
    
    <Form.Group as={Col} controlId="formGridCodiceFiscale">
        <Form.Label><strong>Codice fiscale</strong></Form.Label>
        <InputGroup hasValidation>
        <Form.Control type="text" pattern="^[A-Z]{6}[A-Z0-9]{2}[A-Z][A-Z0-9]{2}[A-Z][A-Z0-9]{3}[A-Z]$" placeholder="Inserisci il codice fiscale" required/>
        <Form.Control.Feedback type="invalid">Inserisci un codice fiscale corretto</Form.Control.Feedback>
        </InputGroup>
    </Form.Group>
    
    </Row>

    <Row className="mb-3">

    <Form.Group as={Col} controlId="formGridNumeroCartaIdentita">
        <Form.Label><strong>Numero carta identità</strong></Form.Label>
        <Form.Control type="text" placeholder="Inserisci il numero della carta d'identità" required/>
    </Form.Group>

    </Row>

    <Row className="mb-3">

    <Form.Group as={Col} controlId="formGridNumeroPatente">
        <Form.Label><strong>Numero patente</strong></Form.Label>
        <Form.Control type="text" placeholder="Inserisci il numero della patente" required/>
    </Form.Group>

    </Row>
    <Row className="mb-3">

    <Form.Group as={Col} controlId="formGridNumeroTelefono">
        <Form.Label><strong>Numero di telefono</strong></Form.Label>
        <Form.Control type="tel" pattern="[0-9]{9,14}$" placeholder="Inserisci il numero di telefono" required/>
    </Form.Group>

    </Row>
    <Row className="mb-3">

    <Form.Group as={Col} controlId="formGridIban">
        <Form.Label><strong>Iban</strong></Form.Label>
        <Form.Control type="text" placeholder="Inserisci il codice iban" required/>
    </Form.Group>

    <Form.Group as={Col} controlId="formGridTariffaAutista">
        <Form.Label><strong>Tariffa oraria</strong></Form.Label>
        <Form.Control type="number" placeholder="Inserisci la tariffa oraria" required/>
    </Form.Group>

    </Row>

    <Row className="mb-3">

<Form.Group as={Col} controlId="formGridRuolo">
    <Form.Label ><strong>Ruolo</strong></Form.Label>
        <select className="form-select mb3" id="ruolo">
        <option selected="selected" value=""></option>
        <option value="Autista">Autista</option>
        <option value="GestoreParcheggio">Gestore parcheggio</option>
        </select>
</Form.Group>

</Row>


    <Button variant="primary" type="submit" >
        Modifica
    </Button>
        <text>  </text>
    <Button variant="primary" type="submit" >
        Elimina
    </Button>
    </Form>
    </div>

    )
}

export default FormGestioneDipendente;