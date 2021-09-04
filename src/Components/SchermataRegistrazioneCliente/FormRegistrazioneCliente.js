import {Row, Form, Button, Col, InputGroup} from "react-bootstrap"
import {isValidElement, useState} from 'react'
//import Feedback from "react-bootstrap/esm/Feedback";
import axios from "axios";
import '../Generali/Generali/bordi.css'
import PopupSuccesso from "../Generali/Generali/PopupSuccesso";
import PopupErrore from "../Generali/Generali/PopupErrore";
const crypto=require('crypto')
let errore

function FormRegistrazioneCliente(){
   // const [validated, setValidated] = useState(false);
    const [ show, setShow ] = useState(false)
    const [ show2, setShow2 ] = useState(false)
  
   
    
    
function handleSubmit(event){
    event.preventDefault();
    var form = document.getElementById("form");

    if (form.checkValidity() === true && verificaPass()===true && confrontoDate()===true) {
        console.log("QUI")
        let crypass= crypto.createHash('sha512');
        crypass.update(document.getElementById("formGridPassword").value); // criptiamo la password
        let passEsa=crypass.digest('hex');

        const clienteReg =  {
            nome: document.getElementById("formGridNome").value,
            cognome: document.getElementById("formGridCognome").value,
            email:document.getElementById("formGridEmail").value,
            password: passEsa,
            indirizzo: document.getElementById("formGridAddress1").value,
            citta: document.getElementById("formGridCity").value,
            cap: document.getElementById("formGridCap").value,
            regione: document.getElementById("regione").value,
            dataNascita: document.getElementById("formGridDataNascita").value,
            codFiscale: document.getElementById("formGridCodiceFiscale").value,
            numCI: document.getElementById("formGridNumeroCartaIdentita").value,
            numPat: document.getElementById("formGridNumeroPatente").value,
            numTel: document.getElementById("formGridNumeroTelefono").value,
            foto: document.getElementById("formFileFoto").value,
            pc: document.getElementsByClassName("form-check-input")[0].checked,
            group: "Cliente"
        };

        try{
            axios.post("http://localhost:5000/utente/registraCliente", clienteReg)
            .then((res) =>{
                //window.sessionStorage.setItem("clienteReg", JSON.stringify(res.data));
                setShow(true)
            }
            ).catch(err =>{
                if(err.response.status===400){
                    errore="Email già utilizzata"
                    setShow2(true)
                }else{
                    errore="Errore generico"
                    setShow2(true)
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
        <div >
        <div className="container-fluid" style={{maxWidth:500, paddingBottom:10, alignContent:'center', paddingTop:10,backgroundColor:"#d6d6f5"}}>
            <div className="TitoloForm" style={{backgroundColor:"blue", textAlign:"center", color:"white", borderRadius:10}}>
            <h2>Registra cliente</h2>
            </div>
            <Form validated onSubmit={handleSubmit} id="form">
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
        <Form.Control type="email" placeholder="Inserisci email" /*pattern="^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$"*/ required/>
        </Form.Group>

        
    </Row>

    <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridPassword">
        <Form.Label><strong>Password</strong></Form.Label>
        <InputGroup hasValidation>
        <Form.Control type="password" placeholder="Password" /*pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$"*/ required/>
        <Form.Control.Feedback type="invalid">
        </Form.Control.Feedback>
        </InputGroup>                  
        </Form.Group>
       

        <Form.Group as={Col} controlId="formGridControlloPassword" >
        <Form.Label><strong>Conferma password</strong></Form.Label>
        <InputGroup hasValidation>
        <Form.Control type="password" placeholder="Password"  required/>
        <Form.Control.Feedback type="invalid">
             Inserire una password che contenga almeno 8 caratteri maiuscoli, minuscoli e numerici
        </Form.Control.Feedback>
        </InputGroup>
        </Form.Group>
  
    </Row>

    <Form.Group className="mb-3" controlId="formGridAddress1">
        <Form.Label><strong>Indirizzo</strong></Form.Label>
        <Form.Control placeholder="Via Mario rossi, 4" />
    </Form.Group>


    <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCity">
        <Form.Label><strong>Città</strong></Form.Label>
        <Form.Control />
        </Form.Group>

       
        <Form.Group as={Col} controlId="formGridCap">
        <Form.Label><strong>Cap</strong></Form.Label>
        <Form.Control />
        </Form.Group>
    </Row>

        <Form.Label><strong>Regione</strong></Form.Label>
        <select className="form-select mb3" id="regione">
        <option selected="selected" value=""></option>
        <option value="Abruzzo">Abruzzo</option>
        <option value="Basilicata">Basilicata</option>
        <option value="Calabria">Calabria</option>
        <option value="Campania">Campania</option>
        <option value="Emilia-Romagna">Emilia-Romagna</option>
        <option value="Friuli-Venezia Giulia">Friuli-Venezia Giulia</option>
        <option value="Lazio">Lazio</option>
        <option value="Liguria">Liguria</option>
        <option value="Lombardia">Lombardia</option>
        <option value="Marche">Marche</option>
        <option value="Molise">Molise</option>
        <option value="Piemonte">Piemonte</option>
        <option value="Puglia">Puglia</option>
        <option value="Sardegna">Sardegna</option>
        <option value="Sicilia">Sicilia</option>
        <option value="Toscana">Toscana</option>
        <option value="Trentino-Alto Adige">Trentino-Alto Adige</option>
        <option value="Umbria">Umbria</option>
        <option value="Valle d'Aosta">Valle d'Aosta</option>
        <option value="Veneto">Veneto</option>
        </select>


    <Form.Group className="mb-3" controlId="formGridDataNascita" style={{paddingTop:5}}>
        <Form.Label><strong>Data di nascita</strong></Form.Label>
        <Form.Control type="date" required/>
    </Form.Group>

    <Row className="mb-3">
    
    <Form.Group as={Col} controlId="formGridCodiceFiscale">
        <Form.Label><strong>Codice fiscale</strong></Form.Label>
        <InputGroup hasValidation>
        <Form.Control type="text" /*pattern="^[A-Z]{6}[A-Z0-9]{2}[A-Z][A-Z0-9]{2}[A-Z][A-Z0-9]{3}[A-Z]$"*/ placeholder="Inserisci il codice fiscale" required/>
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
        <Form.Control type="text" placeholder="Inserisci il numero della patente" />
    </Form.Group>

    </Row>
    <Row className="mb-3">

    <Form.Group as={Col} controlId="formGridNumeroTelefono">
        <Form.Label><strong>Numero di telefono</strong></Form.Label>
        <Form.Control type="tel" /*pattern="[0-9]{9,14}$"*/ placeholder="Inserisci il numero di telefono" required/>
    </Form.Group>

    </Row>
    
    <Row className="mb-3">
        <Form.Group controlId="formFileFoto" className="mb-3">
            <Form.Label><strong>Inserire allegato foto cliente</strong></Form.Label>
            <Form.Control type="file" size="sm" />
        </Form.Group>
    </Row>
 
    <Form.Group className="mb-3" id="formGridCheckboxPC" style={{paddingTop:5}}>
        <Form.Check type="checkbox" label="Dichiaro che il cliente possiede un dispositivo portatile" required/>
    </Form.Group>

    <Button variant="primary" type="submit">
        Registra cliente
    </Button>
    </Form>
    </div>
    <PopupSuccesso
            show={show}
            onHide={() => {setShow(false); window.location.href="/ListaClienti"}}  
            onConfirm={()=>{setShow(false); window.location.href="/ListaClienti"}}
            titolo={"Operazione completata"}
            stringAttenzione={"Il cliente è stato registrato correttamente!"}
            />

        <PopupErrore
            show={show2}
            onHide={() => {setShow2(false)}}  
            errore={errore}
        />
    </div>
    );
}

export default FormRegistrazioneCliente;