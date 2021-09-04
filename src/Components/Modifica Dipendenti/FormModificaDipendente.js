import {Row, Form, Button, Col, InputGroup, FormControl} from "react-bootstrap"
import {useEffect, useState, setState} from 'react'
import axios from "axios";
import '../Generali/Generali/bordi.css'
import PopupSuccesso from "../Generali/Generali/PopupSuccesso"
import PopupErrore from "../Generali/Generali/PopupErrore"
const crypto=require('crypto')

function FormRegistrazioneDipendente(){
    const [validated, setValidated] = useState(false);
    const [ form, setForm ] = useState({})
    const [ errors, setErrors ] = useState({})
    const [show, setShow]=useState(false)
    const [show2, setShow2]=useState(false)
    
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
                ruolo: document.getElementById("ruolo").value,
                id:window.sessionStorage.getItem("dipendenteselezionato")

            };
            
            console.log(dipendenteReg)

            try{
                axios.post("http://localhost:5000/utente/aggiornaDipendente", dipendenteReg)
                .then((res)=>{
                    setShow(true)
                }
                ).catch(err =>{
                    if(err.response.status===400){
                        setShow2(true)
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
            console.log(typeof(datiUtente[0].IdUserid))
            let dipendenteselezionato=window.sessionStorage.getItem("dipendenteselezionato")
            console.log(typeof(dipendenteselezionato))
            let nome, cognome, email, indirizzo, citta, cap,regione,dataNascita,codFiscale,numCI,numPat,numTel,foto,pc
            for(let i=0;i<datiUtente.length;i++){
                if(datiUtente[i].IdUserid===parseInt(dipendenteselezionato)){
                    console.log(i)
                    console.log([datiUtente[i]])
                    nome=document.getElementById("formGridNome")
                    nome.value=datiUtente[i].Nome
                    cognome=document.getElementById("formGridCognome")
                    cognome.value=datiUtente[i].Cognome
                    email=document.getElementById("formGridEmail")
                    email.value=datiUtente[i].Email
                  //indirizzo=document.getElementById("formGridAddress1")
                    //indirizzo.value=datiUtente[i].DomIndirizzo
                    //citta=document.getElementById("formGridCity")
                    //citta.value=datiUtente[i].DomComune
                    //cap=document.getElementById("formGridCap")
                   // cap.value=datiUtente[i].DomCAP
                   // regione=document.getElementById("regione")
                    //regione.value=datiUtente[i].DomRegione
                    if(datiUtente[i].Ruolo!=='Autista'){
                        document.getElementById("formGridTariffaAutista").disabled=true
                        document.getElementById("formGridTariffaAutista").value=0
                    }
                    else{
                    document.getElementById("formGridTariffaAutista").value=datiUtente[i].TariffaAutista
                    }
                    document.getElementById("formGridIban").value=datiUtente[i].Iban
                    document.getElementById("ruolo").value=datiUtente[i].Ruolo
                    if(datiUtente[i].Ruolo!=='Amministratore'){
                        document.getElementById("ruolo").disabled=true
                    }
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
                   // foto= document.getElementById("formFileFoto")
                    //foto.value=datiUtente[i].Foto
                    //pc= document.getElementById("formGridCheckboxPC")
                    //pc.value=datiUtente[i].DispositivoPortatile
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

function verificaRuolo(){
    let utente=JSON.parse(window.sessionStorage.getItem("utente")).Ruolo
    if(utente!=="Amministratore"){
        document.getElementById("formGridEmail").disabled=true
        document.getElementById("formGridTariffaAutista").disabled=true
        document.getElementById("ruolo").disabled=true
    }
}


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
        axios.post("http://localhost:5000/utente/ricevidatidipendenti") //da modificare nel nostro caso
        .then((res)=>{
            console.log(res.data)
            precompilaForm(res.data)
            verificaRuolo()
        }).catch(err=>{
            console.log(err)
        })        
    })

    return(
    
        <div className="container-fluid" style={{maxWidth:500, paddingBottom:10, alignContent:'center', paddingTop:10,backgroundColor:"#d6d6f5"}}>
            <div className="TitoloForm" style={{backgroundColor:"blue", textAlign:"center", color:"white", borderRadius:10}}>
            <h2>Modifica dati dipendente</h2>
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
        <Form.Control type="text" placeholder="Inserisci il numero della patente" required/>
    </Form.Group>

    </Row>
    <Row className="mb-3">

    <Form.Group as={Col} controlId="formGridNumeroTelefono">
        <Form.Label><strong>Numero di telefono</strong></Form.Label>
        <Form.Control type="tel" /*pattern="[0-9]{9,14}$"*/ placeholder="Inserisci il numero di telefono" required/>
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
        <option value="Amministratore">Amministratore</option>
        </select>
</Form.Group>

</Row>


    <Button variant="primary" type="submit" >
        Modifica dipendente
    </Button>
    </Form>

    <PopupErrore
        show={show2}
        onHide={() => {setShow2(false)}}  
        errore={"La mail è già presente nel database. Ricontrollare i dati inseriti"}
    />

    <PopupSuccesso
        show={show}
        onHide={() => {setShow(false); window.location.href="/ListaDipendenti"}}  
        onConfirm={()=>{setShow(false); window.location.href="/ListaDipendenti"}}
        titolo={"Operazione completata"}
        stringAttenzione={"I dati del dipendente sono stati modificati correttamente!"}
    />
    </div>

    )
}

export default FormRegistrazioneDipendente;