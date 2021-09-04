import {Row, Form, Button, Col} from "react-bootstrap"
//import {isValidElement, useState, setState} from 'react'
import axios from "axios";
import { useEffect } from "react";
//import $ from "jquery"
//import Feedback from "react-bootstrap/esm/Feedback";
import '../Generali/Generali/bordi.css'
    function FormRicerca(){

        function abilitaAutista(){
            console.log("Cambiato")
            let valore=document.getElementById("ruolo").value
            if(valore!=='Auto'){
                document.getElementById("autista").disabled=true
                document.getElementById("autista").checked=false
            }
            else{
                document.getElementById("autista").disabled=false
            }
        }

        function handleSubmit(){
            const datiPrenotazione={
                dataOraInizio:document.getElementById("formGridDataInizio").value+"T"+document.getElementById("formGridOraInizio").value,
                dataOraFine:document.getElementById("formGridDataFine").value+"T"+document.getElementById("formGridOraFine").value,
                tipologiaMezzo:document.getElementById("ruolo").value,
                autista:document.getElementById("autista").checked,
                categoria:"%",
                passeggeri:"%",
                cambio:"%",
            }
            console.log(datiPrenotazione)
            let datiprenotazione=JSON.stringify(datiPrenotazione)
            window.sessionStorage.setItem("datiprenotazione",datiprenotazione)
            axios.post("http://localhost:5000/prenotazioni/ricercaMezzo",datiPrenotazione)
            .then((res)=>{
                console.log(res)
            })
            .catch((err)=>{
                console.log(err)
            })
            window.location.href="/SchermataRisultati"
        }

        useEffect(()=>{
            abilitaAutista()            
        },[])

    return(
        
        <div style={{height:800, paddingTop:100}}>
        <div className="container-fluid" style={{maxWidth:400, paddingBottom:10, alignContent:'center', paddingTop:10,backgroundColor:"#d6d6f5" }}>
            <div className="TitoloForm" style={{backgroundColor:"blue", textAlign:"center", color:"white", borderRadius:10}}>
            <h2>Ricerca il tuo veicolo</h2>
            </div>
            <Form  id="form">
    <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridDataInizio" >
        <Form.Label><strong>Data Inizio</strong></Form.Label>
        <Form.Control type="date" required/>       
        </Form.Group>

    </Row>

    <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridOraInizio">
        <Form.Label><strong>Ora inizio</strong></Form.Label>
        <Form.Control type="time" required/>
        </Form.Group>

        
    </Row>

    <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridDataFine" >
        <Form.Label><strong>Data fine</strong></Form.Label>
        <Form.Control type="date" required/>       
        </Form.Group>

    </Row>

    <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridOraFine">
        <Form.Label><strong>Ora fine</strong></Form.Label>
        <Form.Control type="time" required/>
        </Form.Group>

        
    </Row>

    <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridTipoMezzo" onChange={abilitaAutista}>
        <Form.Label ><strong>Tipologia mezzo</strong></Form.Label>
        <select className="form-select mb3" id="ruolo">
        <option selected="selected" value=""></option>
        <option value="Auto">Auto</option>
        <option value="Moto">Moto</option>
        <option value="Bicicletta">Bicicletta</option>
        <option value="Monopattino">Monopattino</option>
        </select>
        </Form.Group>
  
    </Row>

    <Form.Check     
             
          label="Autista"
          id="autista"
        />

    <Button variant="primary" type="button" onClick={handleSubmit} style={{marginTop:15}}>
        Cerca
    </Button>
    </Form>
    </div>    
    </div>

    )
}

export default FormRicerca;