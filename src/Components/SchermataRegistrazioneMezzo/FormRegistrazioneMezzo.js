import {Row, Form, Button, Col} from "react-bootstrap"
import {useState, useEffect} from 'react'
//import $ from "jquery"
//import Feedback from "react-bootstrap/esm/Feedback";
import PopupSuccesso from "../Generali/Generali/PopupSuccesso"
import PopupErrore from "../Generali/Generali/PopupErrore";
import axios from "axios";
import '../Generali/Generali/bordi.css'
const crypto=require('crypto')


function FormRegistrazioneMezzo(){
    const [validated, setValidated] = useState(false);
    const [ form, setForm ] = useState({})
    const [ errors, setErrors ] = useState({})
    const [show, setShow] = useState(false);  //per mostrare o nascondere il popupSuccesso
    const [show2, setShow2] = useState(false);  //per mostrare o nascondere il popupErrore

    function formPersonalizzato(){
        let tipomezzo=document.getElementById("tipoMezzo").value
        if(tipomezzo==="Auto"){
            document.getElementById("modello").disabled=false
            document.getElementById("alimentazione").disabled=false
            document.getElementById("categoria").disabled=false
            document.getElementById("NumPosti").disabled=false
            document.getElementById("cambio").disabled=false
            document.getElementById("optional").disabled=false

        }
        else if(tipomezzo==="Moto"){
            document.getElementById("modello").disabled=true
            document.getElementById("modello").value=""
            document.getElementById("alimentazione").disabled=false
            document.getElementById("categoria").disabled=false
            document.getElementById("NumPosti").value="2"
            document.getElementById("NumPosti").disabled=true
            document.getElementById("cambio").disabled=false
            document.getElementById("optional").disabled=true

        }
        else if(tipomezzo==="Bicicletta" || tipomezzo==="Monopattino"){
            document.getElementById("modello").disabled=true
            document.getElementById("modello").value=""
            document.getElementById("alimentazione").disabled=true
            document.getElementById("categoria").disabled=true
            document.getElementById("NumPosti").disabled=true
            document.getElementById("cambio").disabled=true
            document.getElementById("optional").disabled=true
            document.getElementById("NumPosti").value="1"


        }
    }
    function recuperoParcheggi(){
        axios.post("http://localhost:5000/mezzi/recuperaparcheggi")
        .then((res)=>{
            compilaform(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })
        function compilaform(dati){
            let formritiro=document.getElementById("parcheggio")
            console.log(dati)
            let option
            if(formritiro.length===0){
                for(let i=0;i<dati.length;i++){
                    console.log("qui")
                    option=document.createElement("option")
                    option.value=dati[i].IdParcheggioStallo
                    option.id=dati[i].IdParcheggioStallo
                    option.innerHTML=dati[i].DescParcheggioStallo
                    console.log(option)
                    formritiro.appendChild(option)
                }                             
            } 
        }         
    }

    function inserisciDatiMezzo(event){
        event.preventDefault();
        var form = document.getElementById("form");
    
        if (form.checkValidity() === true){

            const mezzoReg ={
                tipologia: document.getElementById("tipoMezzo").value,
                targa:  document.getElementById("targa").value,
                modello:  document.getElementById("modello").value,
                alimentazione:  document.getElementById("alimentazione").value,
                categoria:  document.getElementById("categoria").value,
                numPosti:  document.getElementById("NumPosti").value,
                cambio:  document.getElementById("cambio").checked,
                optional:  document.getElementById("optional").value,
                descrizioneMezzo:  document.getElementById("descrizioneMezzo").value,
                parc:  document.getElementById("parcheggio").value,
                tariffaOraria:  document.getElementById("tariffa").value,
                sovraprezzo:  document.getElementById("sovraprezzo").value
            };

            try{
                axios.post("http://localhost:5000/mezzi/inserisciMezzo", mezzoReg)
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

        useEffect(()=>{
            recuperoParcheggi()
        })
    
    return(
    
        <div className="container-fluid" style={{maxWidth:500, paddingBottom:10, alignContent:'center', paddingTop:10,backgroundColor:"#d6d6f5"}}>
            <div className="TitoloForm" style={{backgroundColor:"blue", textAlign:"center", color:"white", borderRadius:10}}>
            <h2>Registrazione mezzo</h2>
            </div>
            <Form id="form" onSubmit={inserisciDatiMezzo}>
    <Row className="mb-3">

    <Form.Group as={Col} controlId="tipoMezzo">
        <Form.Label ><strong>Tipologia mezzo</strong></Form.Label>
        <select className="form-select mb3" id="tipoMezzo" onChange={formPersonalizzato} required>
        <option value="Auto">Auto</option>
        <option value="Moto">Moto</option>
        <option value="Bicicletta">Bicicletta</option>
        <option value="Monopattino">Monopattino</option>
        </select>    
            
      </Form.Group>

        <Form.Group as={Col} controlId="targa">
        <Form.Label><strong>Targa/Matricola</strong></Form.Label>
        <Form.Control type="text" placeholder="Inserisci la targa/matricola"/>
        </Form.Group>
    </Row>

    <Row className="mb-3">
        <Form.Group as={Col} controlId="modello">
        <Form.Label><strong>Modello</strong></Form.Label>
        <select className="form-select mb3" id="modello" required>
        <option value=""></option>
        <option value="Fiat Panda">Fiat Panda</option>
        <option value="Volkswagen Polo">Volkswagen Polo</option>
        <option value="Opel Corsa">Opel Corsa</option>
        <option value="Opel Crossland X">Opel Crossland X</option>
        </select> 
        </Form.Group>

        <Form.Group as={Col} >
        <Form.Label><strong>Alimentazione</strong></Form.Label>
        <select className="form-select mb3" id="alimentazione">
        <option selected="selected" value=""></option>
        <option value="Benzina">Benzina</option>
        <option value="Diesel">Diesel</option>
        <option value="Elettrico">Elettrico</option>

        </select>  
        </Form.Group>

        
    </Row>

    <Row className="mb-3">
    <Form.Group as={Col} controlId="colore">
        <Form.Label><strong>Categoria</strong></Form.Label>
        <select className="form-select mb3" id="categoria">
        <option selected="selected" value=""></option>
        <option value="Piccola">Piccola</option>
        <option value="Media">Media</option>
        <option value="Grande">Grande</option>
        </select>
    </Form.Group>
       

        <Form.Group as={Col} controlId="NumPosti">
        <Form.Label><strong>Numero posti</strong></Form.Label>
        <select className="form-select mb3" id="NumPosti">
        <option value="1"></option>
        <option value="2">2</option>
        <option value="4">4</option>
        <option value="5">5</option>
        </select>
        </Form.Group>
  
    </Row>


    

    <Row className="mb-3">
    
    <Form.Group controlId="cambio">
        <Form.Check   
             
          label="Cambio Automatico"
          id="cambio"
        />
        </Form.Group>

        <Form.Group as={Col} controlId="optional">
        <Form.Label><strong>Optional</strong></Form.Label>
        <Form.Control type="text" placeholder="Inserisci optional" />
        </Form.Group>
    
    </Row>

    <Row className="mb-3">
    <label for="exampleFormControlTextarea1"><strong>Descrizione mezzo</strong></label>
    <textarea class="form-control" id="descrizioneMezzo" rows="3"></textarea>

    </Row>

    <Row className="mb-3">

    <Form.Group as={Col} controlId="parcheggio" >
        <Form.Label><strong>Stallo/Parcheggio</strong></Form.Label>
        <select className="form-select mb3" id="parcheggio">
        
        </select>    
            
      </Form.Group>

    </Row>
    <Row className="mb-3">

    <Form.Group as={Col} controlId="tariffa">
        <Form.Label><strong>Tariffa oraria</strong></Form.Label>
        <Form.Control type="number" min="1" placeholder="Inserisci la tariffa oraria" required/>
    </Form.Group>

    <Form.Group as={Col} controlId="sovrapprezzo">
        <Form.Label><strong>Sovrapprezzo</strong></Form.Label>
        <Form.Control type="number" id="sovraprezzo" min="1" placeholder="Inserisci sovrapprezzo" required/>
    </Form.Group>

    </Row>
    <Row className="mb-3">

    </Row>

    <Button variant="primary" type="submit">
        Registra mezzo
    </Button>
    </Form>
    <PopupSuccesso
    show={show}
    onHide={() => {setShow(false); window.location.href="/ListaMezzi"}}  
    onConfirm={()=>{setShow(false); window.location.href="/ListaMezzi"}}
    titolo={"Operazione completata"}
    stringAttenzione={"Il mezzo è stato aggiunto correttamente!"}
    />

    <PopupErrore
        show={show2}
        onHide={() => {setShow2(false)}}  
        errore={"La targa è già presente nel database. Ricontrollare i dati inseriti"}
    />
    </div>
    
    )
}

export default FormRegistrazioneMezzo;