import {Row, Form, Button, Col, Collapse} from "react-bootstrap"
//import {isValidElement, useState, setState} from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import PopupErrore from "../Generali/Generali/PopupErrore";
import PopupSuccesso from "../Generali/Generali/PopupSuccesso";
//import $ from "jquery"
//import Feedback from "react-bootstrap/esm/Feedback";
import '../Generali/Generali/bordi.css'
    function FormRicerca(){
        const [show, setShow]=useState(false)       
        const [showerrore, setShowErrore]= useState(false)
        const [errore, setErrore]=useState()
        const [show2, setShow2]=useState(false)

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
            let datainizio=new Date(document.getElementById("formGridDataInizio").value+"T"+document.getElementById("formGridOraInizio").value)
            let datafine=new Date(document.getElementById("formGridDataFine").value+"T"+document.getElementById("formGridOraFine").value)

            if(datafine<datainizio){
                setErrore("La data di consegna non può essere antecedente a quella di ritiro del mezzo!")
                setShowErrore(true)
                return
            }
            else if(datainizio<new Date()){
                setErrore("La data di inizio non può essere antecedente a quella odierna!")
                setShowErrore(true)
                return
            }

            const datiPrenotazione={
                idCliente:document.getElementById("idCliente").value,
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
            if(JSON.parse(window.sessionStorage.getItem("utente"))){
                if(JSON.parse(window.sessionStorage.getItem("utente")).Ruolo==="Amministratore"){
                    setShow(true)
                }
            }        
            if(JSON.parse(window.sessionStorage.getItem("datiprenotazione"))){
                setShow2(true)
            }
        },[])

    return(
        
        <div style={{height:800, paddingTop:100}}>
        <div className="container-fluid" style={{maxWidth:400, paddingBottom:10, alignContent:'center', paddingTop:10,backgroundColor:"#d6d6f5" }}>
            <div className="TitoloForm" style={{backgroundColor:"blue", textAlign:"center", color:"white", borderRadius:10}}>
            <h2>Ricerca il tuo veicolo</h2>
            </div>
            <Form  id="form">
                <Collapse in={show}>
                    <div>
                    <Form.Group as={Col} controlId="idCliente" >
                    <Form.Label><strong>Id Cliente</strong></Form.Label>
                    <Form.Control type="number" min="1"/>
                    </Form.Group>

                    </div>
                </Collapse>
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

    <PopupErrore
            show={showerrore}
            errore={errore}
            onHide={()=>{setShowErrore(false)}}
        />
         <PopupSuccesso
            show={show2}
            onHide={() => {setShow2(false); window.sessionStorage.removeItem("datiprenotazione")}}  
            onConfirm={()=>{setShow2(false); window.location.href="/SchermataRisultati"}}
            titolo={"Prenotazione pendente"}
            stringAttenzione={"C'è una prenotazione non completata, vuoi tornare alla schermata risultati?"}
        />
    </div>

    )
}

export default FormRicerca;
