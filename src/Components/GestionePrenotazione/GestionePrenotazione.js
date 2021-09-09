import {Row,Col, Collapse, Button, Form} from "react-bootstrap"
import {useState, useEffect} from 'react'
import PopupSuccesso from "../Generali/Generali/PopupSuccesso"
const axios=require('axios')

function GestionePrenotazione(){
    let prenotazioneselezionata=JSON.parse(window.sessionStorage.getItem("prenotazioneselezionata"))
    let parcheggioritiro=""
    let parcheggioconsegna=""

    let autista
    if(prenotazioneselezionata.IdAutista===null){
        autista="Non richiesto"
    }
    else{
        autista="Si"
    }

      let stringariepilogo="Prenotazione"
      const [open, setOpen] = useState(true); //iniziacorsa
      const [open2, setOpen2] = useState(false);//opzionicorsa
      const [open3, setOpen3] = useState(false);//Avaria/Incidente
      const [open4, setOpen4] = useState(false);//indirizzodiverso
      const [open5, setOpen5] = useState(false);//indirizzodiverso
      const [open6, setOpen6] = useState(false);//Segnalaritardo
      const [show, setShow] = useState(false);//per mostrare o nascondere il popupSuccesso
      const [show2, setShow2] = useState(false);//per mostrare o nascondere il popupSuccesso
      const [open7, setOpen7] = useState(false)


      function handleChange(){
        let c=document.getElementById("opzioniconsegna").value
        console.log(document.getElementById("opzioniconsegna").value==="altro")
        if(document.getElementById("opzioniconsegna").value==="altro"){
            document.getElementById("Indirizzodiverso").required=true
            document.getElementById("Cap").required=true
            document.getElementById("Citta").required=true
            setOpen5(true)
        }
        else{
            document.getElementById("Indirizzodiverso").required=false
            document.getElementById("Cap").required=false
            document.getElementById("Citta").required=false
            document.getElementById("Indirizzodiverso").value=""
            document.getElementById("Cap").value=""
            document.getElementById("Citta").value=""
            setOpen5(false)
        }
    }

    function recuperaDatiParcheggi(){
        axios.post("http://localhost:5000/mezzi/recuperaparcheggi")
        .then((res)=>{
            for(let i=0;i<res.data.length;i++){
                if(res.data[i].IdParcheggioStallo===prenotazioneselezionata.IdParcheggioStalloRitiro){
                    parcheggioritiro=res.data[i].DescParcheggioStallo+", "+res.data[i].Indirizzo
                    break;
                }
            }
            for(let i=0;i<res.data.length;i++){
                if(res.data[i].IdParcheggioStallo===prenotazioneselezionata.IdParcheggioStalloConsegna){
                    parcheggioconsegna=res.data[i].DescParcheggioStallo+", "+res.data[i].Indirizzo
                    break;
                }
            }
            console.log(parcheggioconsegna)
            let ritiro=document.getElementById("parcheggioritiro")
            let text=document.createElement("text")
            text.innerHTML=parcheggioritiro
            ritiro.appendChild(text)
            ritiro=document.getElementById("parcheggioconsegna")
            let text2=document.createElement("text")
            text2.innerHTML=parcheggioconsegna
            ritiro.appendChild(text2)
        }).catch((err)=>{
            console.log(err)
        })
    }

    function verificaCorsa(){
        if(prenotazioneselezionata.CorsaConclusa===1){
            setOpen(false)
            setOpen7(true)
        }
        else if(prenotazioneselezionata.CorsaAvviata===1){
            setOpen(false)
            setOpen2(true)
        }
    }

    function inizioCorsa(){
        axios.post("http://localhost:5000/prenotazioni/avviacorsa",{corsaAvviata:1, idPrenotazione:prenotazioneselezionata.IdPrenotazione})
        .then((res)=>{
            console.log(res)
            prenotazioneselezionata.CorsaAvviata=1
            window.sessionStorage.setItem("prenotazioneselezionata",JSON.stringify(prenotazioneselezionata))//aggiorno il session storage
            prenotazioneselezionata=JSON.parse(window.sessionStorage.getItem("prenotazioneselezionata"))
            setOpen(false)
            setOpen2(true)
        }).catch((err)=>{
            console.log(err)
        })        
    }

    function finisciCorsa(){
        axios.post("http://localhost:5000/prenotazioni/concludicorsa",{corsaConclusa:1, idPrenotazione:prenotazioneselezionata.IdPrenotazione})
        .then((res)=>{
            console.log(res)
            setShow(true)
            setOpen2(false)
            setOpen7(true)
        }).catch((err)=>{
            console.log(err)
        })
    }

    useEffect(()=>{
        if(JSON.parse(window.sessionStorage.getItem("utente")).Ruolo==="GestoreParcheggio"){
            setOpen(false)
            setOpen2(true)
            document.getElementById("avaria").disabled=true
            document.getElementById("luogoconsegna").disabled=true
            document.getElementById("ritardo").disabled=true
            if(prenotazioneselezionata.CorsaAvviata===0){
                document.getElementById("finecorsa").disabled=true
            }            
            else{
                document.getElementById("finecorsa").disabled=false
            }
            if(prenotazioneselezionata.CorsaConclusa===1){
                setOpen2(false)
            }
        }
        recuperaDatiParcheggi()
        verificaCorsa()
    },[])

   
    return(
        <div className="container" style={{minHeight:600, paddingTop:30, backgroundColor:"#f2f2f2"}}>
        <Row style={{backgroundColor:"#e6e6e6", marginTop:100}}>
                <Col>
                <h2>Riepilogo {stringariepilogo}</h2>                 
                <div>
                <p><strong>ID cliente: </strong>{prenotazioneselezionata.IdCliente}</p>  
                <p><strong>Modello: </strong> {prenotazioneselezionata.Modello}</p>
                <p><strong>Data e ora di ritiro: </strong>{new Date(prenotazioneselezionata.DataOraRitiro).toLocaleString()}</p> 
                <p><strong>Data e ora di consegna: </strong>{new Date(prenotazioneselezionata.DataOraConsegnaProgrammata).toLocaleString()}</p> 
                <p id="parcheggioritiro"><strong>Luogo ritiro: </strong>{parcheggioritiro}</p> 
                <p id="parcheggioconsegna"><strong>Luogo consegna: </strong>{parcheggioconsegna}</p> 
                <p><strong>Autista: </strong>{autista}</p> 
                </div>                            
                </Col>
                <Col>                            
                <Collapse in={open} style={{paddingBottom:30}}>
                    <div id="iniziacorsa">
                    <Button variant="success" size="lg" style={{marginTop:150, marginLeft:50}} onClick={()=>{inizioCorsa()}}>
                        Conferma inizio corsa
                    </Button>    
                    </div>                    
                </Collapse>
                <Collapse in={open2}>
                <div id="opzionicorsa">
                    <Col>
                    <Button variant="danger" id="avaria"style={{marginTop:10}} onClick={()=>{setOpen2(false);setOpen3(true)}}>
                        Segnala avaria/incidente
                    </Button> 
                    </Col>
                    <Col> 
                    <Button style={{marginTop:10}} id="luogoconsegna" onClick={()=>{setOpen2(false);setOpen4(true)}}>
                        Modifica luogo di consegna
                    </Button> 
                    </Col>
                    <Col> 
                    <Button variant="warning" id="ritardo"style={{marginTop:10}} onClick={()=>{setOpen6(true);setOpen2(false)}}>
                        Segnala ritardo
                    </Button> 
                    </Col>
                    <Button variant="success" id="finecorsa" style={{marginTop:10}} onClick={()=>{finisciCorsa()}}>
                        Conferma fine corsa
                    </Button>   
                    
                    </div>   
                </Collapse>
                <Collapse in={open3}>
                    <div>
                    <Button style={{marginTop:10}} onClick={()=>{setOpen3(false);setOpen2(true)}}>
                        Indietro
                    </Button>
                    <Row>
                        <Col>
                        <label for="exampleFormControlTextarea1"><strong>Note</strong></label>
                        <textarea class="form-control" placeholder="Inserire dettagli su avaria/incidente ed indirizzo. Un nostro operatore la contatterà a breve" id="descrizioneMezzo" rows="3" required></textarea>                        
                        </Col>
                        
                     </Row>
                     <Button style={{marginTop:10}} onClick={()=>setShow2(true)}>
                        Invia segnalazione
                    </Button>
                    </div>
                </Collapse>
                <Form id="formdettagliparcheggio">                   
                                       
                    <Collapse in={open4}>
                        <div id="example-collapse-text">
                        <Button style={{marginTop:10}} onClick={()=>{setOpen4(false);setOpen2(true)}}>
                        Indietro
                        </Button>
                        <Form.Group as={Col} controlId="parcheggioconsegna">
                        <Form.Label ><strong>Parcheggio/Stallo consegna</strong></Form.Label>                        
                            <select className="form-select mb3" id="opzioniconsegna" onChange={handleChange}>
                            <option selected="selected" value="as">Parcheggio4</option>
                            <option value="altro">Altro</option>
                            <option value="">Parcheggio1</option>
                            <option value="">Parcheggio2</option>
                            <option value="">Parcheggio3</option>
                            </select>
                    </Form.Group>  
                    <Button style={{marginTop:10}} onClick={()=>{setOpen4(false);setOpen2(true)}}>
                            Conferma
                        </Button>
                    <Collapse in={open5}>
                        <div>
                        <Form.Group as={Col} controlId="Indirizzodiverso">
                         <Form.Label><strong>Destinazione diversa indirizzo</strong></Form.Label>
                          <Form.Control type="text" placeholder="Inserisci se non consegni in un parcheggio/stallo"/>
                            </Form.Group>  
                            <Row>
                            <Form.Group as={Col} controlId="Cap">
                                <Form.Label><strong>Destinazione diversa CAP</strong></Form.Label>
                                <Form.Control type="text" placeholder=""/>
                            </Form.Group>
                            <Form.Group as={Col} controlId="Citta">
                                <Form.Label><strong>Destinazione diversa città</strong></Form.Label>
                                <Form.Control type="text" placeholder=""/>
                            </Form.Group>
                            </Row>  
                            </div>
                            </Collapse>
                        </div>
                    </Collapse>   
                                       
                    </Form>
                    <Collapse in={open6}>
                        <div>
                        <Button style={{marginTop:10}} onClick={()=>{setOpen6(false);setOpen2(true)}}>
                        Indietro
                        </Button>
                        <Form.Group as={Col} controlId="formGridDataInizio" >
                        <Form.Label><strong>Ora consegna prevista</strong></Form.Label>
                        <Form.Control type="time" required/>       
                        </Form.Group>
                        <Button style={{marginTop:10}} onClick={()=>{setShow2(true);setOpen6(false)}}>
                            Conferma
                        </Button> 
                        </div>
                    </Collapse>
                    <Collapse in={open7}>
                        <div style={{paddingTop:100,paddingLeft:70}}>Corsa Terminata</div>
                    </Collapse>
                </Col>
            </Row>             
               
            <PopupSuccesso
                id="popup"
                show={show2}     
                onHide={()=>{setShow2(false);setOpen2(true);setOpen3(false)}} 
                onConfirm={()=>{setShow2(false);setOpen2(true);setOpen3(false)}}          
                titolo={"Segnalazione inviata"}
                stringAttenzione={"La segnalazione è stata inoltrata correttamente correttamente"}
            />                       
                                 
            
            <PopupSuccesso
                id="popup"
                show={show}     
                onHide={()=>setShow(false)} 
                onConfirm={()=>{setShow(false)}}          
                titolo={"Corsa terminata!"}
                stringAttenzione={"La corsa è stata conclusa correttamente"}
            />   
          </div>
    )
    
}

export default GestionePrenotazione