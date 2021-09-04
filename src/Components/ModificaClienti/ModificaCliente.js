import {Row, Form, Button, Col, InputGroup, FormControl} from "react-bootstrap"
import {isValidElement, useState, setState, useEffect} from 'react'
import axios from "axios";
import PopupSuccesso from "../Generali/Generali/PopupSuccesso";
import '../Generali/Generali/bordi.css'
const crypto=require('crypto')

function FormGestioneCliente(){
    const [validated, setValidated] = useState(false);
    const [ form, setForm ] = useState({})
    const [ errors, setErrors ] = useState({})
    const [show,setShow]=useState(false)
    const [show2,setShow2]=useState(false)

function handleSubmit(event){
    event.preventDefault();
    var form = document.getElementById("form");

    if (form.checkValidity() === true && verificaPass()===true && confrontoDate()===true) {
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
            id: window.sessionStorage.getItem("utenteselezionato")
        };

        try{
            axios.post("http://localhost:5000/utente/aggiornaUtente", clienteReg)
            .then((res) =>{
                window.sessionStorage.setItem("clienteReg", JSON.stringify(res.data));
                let ruolo=JSON.parse(window.sessionStorage.getItem("utente")).Ruolo
                console.log(ruolo)
                if(ruolo==="Cliente"){
                    setShow(true)
                }
                else{
                    setShow2(true)
                }
            }
            ).catch(err =>{
                if(err.response.status===400){
                    alert("Email già utilizzata");
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

function precompilaForm(datiUtente) {
    console.log("qui")
    console.log(datiUtente.length)
    let utenteselezionato=parseInt(window.sessionStorage.getItem("utenteselezionato"))
    console.log(utenteselezionato)
    let nome, cognome, email, indirizzo, citta, cap,regione,dataNascita,codFiscale,numCI,numPat,numTel,foto,pc
    for(let i=0;i<datiUtente.length;i++){
        if(datiUtente[i].IdCliente===utenteselezionato){
            console.log(i)
            nome=document.getElementById("formGridNome")
            nome.value=datiUtente[i].Nome
            cognome=document.getElementById("formGridCognome")
            cognome.value=datiUtente[i].Cognome
            email=document.getElementById("formGridEmail")
            email.value=datiUtente[i].Email
            indirizzo=document.getElementById("formGridAddress1")
            indirizzo.value=datiUtente[i].DomIndirizzo
            citta=document.getElementById("formGridCity")
            citta.value=datiUtente[i].DomComune
            cap=document.getElementById("formGridCap")
            cap.value=datiUtente[i].DomCAP
            regione=document.getElementById("regione")
            regione.value=datiUtente[i].DomRegione
            dataNascita=document.getElementById("formGridDataNascita")
            dataNascita.value=datiUtente[i].DataNascita.substr(0,10)
            codFiscale=document.getElementById("formGridCodiceFiscale")
            codFiscale.value=datiUtente[i].CodiceFiscale
            numCI= document.getElementById("formGridNumeroCartaIdentita")
            numCI.value=datiUtente[i].CartaDIdentita
            numPat= document.getElementById("formGridNumeroPatente")
            numPat.value=datiUtente[i].Patente
            numTel= document.getElementById("formGridNumeroTelefono")
            numTel.value=datiUtente[i].Telefono
            foto= document.getElementById("formFileFoto")
            foto.value=datiUtente[i].Foto
            pc= document.getElementById("formGridCheckboxPC")
            pc.value=datiUtente[i].DispositivoPortatile
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

    useEffect(()=>{
        axios.post("http://localhost:5000/utente/ricevidatiutente",{withCredentials:true})
      .then((res)=>{
          console.log(res.data)
          /*for(let i=0;i<res.data.length;i++){
              console.log(typeof(res.data[i].IdCliente))
              console.log(typeof(parseInt(window.sessionStorage.getItem("utenteselezionato"))))
              if(res.data[i].IdCliente===parseInt(window.sessionStorage.getItem("utenteselezionato"))){
                  console.log("Trovato!")
                  precompilaForm(res.data[i])
                  break;
              }
          }*/
          precompilaForm(res.data)
      }).catch(err=>{
          console.log(err)
      })  
    })

    return(
        <div >
        <div className="container-fluid" style={{maxWidth:500, paddingBottom:10, alignContent:'center', paddingTop:10,backgroundColor:"#d6d6f5"}}>
            <div className="TitoloForm" style={{backgroundColor:"blue", textAlign:"center", color:"white", borderRadius:10}}>
            <h2>Modifica cliente</h2>
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
        <Form.Control type="password" placeholder="Password" required/>
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
        <Form.Check type="checkbox" label="Dichiaro che il cliente possiede un dispositivo portatile" />
    </Form.Group>

    <Button variant="primary" type="submit">
        Modifica
    </Button>
           
    </Form>
    </div>
    <PopupSuccesso
        show={show}
        onHide={() => {setShow(false); window.location.href="/SchermataPersonaleUtente"}}  
        onConfirm={()=>{setShow(false); window.location.href="/SchermataPersonaleUtente"}}
        titolo={"Operazione completata"}
        stringAttenzione={"I dati sono stati aggiornati correttamente!"}
    />
    <PopupSuccesso
        show={show2}
        onHide={() => {setShow(false); window.location.href="/ListaClienti"}}  
        onConfirm={()=>{setShow(false); window.location.href="/ListaClienti"}}
        titolo={"Operazione completata"}
        stringAttenzione={"I dati sono stati aggiornati correttamente!"}
    />
    </div>
    );
}

export default FormGestioneCliente;