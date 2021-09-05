import {Form, Button, Collapse, Col, Row} from "react-bootstrap"
import {useState, useEffect} from "react"
const axios=require('axios')
require ('bootstrap')

function SchermataModificaPrenotazione(){

    const [open, setOpen] = useState(false); //iniziacorsa

    function handleChange(){
        let c=document.getElementById("opzioniconsegna").value
        console.log(document.getElementById("opzioniconsegna").value==="altro")
        if(document.getElementById("opzioniconsegna").value==="altro"){
            document.getElementById("Indirizzodiverso").required=true
            document.getElementById("Cap").required=true
            document.getElementById("Citta").required=true
            setOpen(true)
        }
        else{
            document.getElementById("Indirizzodiverso").required=false
            document.getElementById("Cap").required=false
            document.getElementById("Citta").required=false
            document.getElementById("Indirizzodiverso").value=""
            document.getElementById("Cap").value=""
            document.getElementById("Citta").value=""
            setOpen(false)
        }
    }
    function compilaform(dati){
        let formritiro=document.getElementById("opzioniritiro")
        let formconsegna=document.getElementById("opzioniconsegna")
        console.log(dati)
        let option
        if(formritiro.length===0){
            for(let i=0;i<dati.length;i++){
                option=document.createElement("option")
                option.value=dati[i].IdParcheggioStallo
                option.innerHTML=dati[i].DescParcheggioStallo
                console.log(option)
                formritiro.appendChild(option)
            }  
            for(let i=0;i<dati.length;i++){
                option=document.createElement("option")
                option.value=dati[i].IdParcheggioStallo
                option.innerHTML=dati[i].DescParcheggioStallo
                console.log(option)
                formconsegna.appendChild(option)
            }  
            option=document.createElement("option")
            option.value="altro"
            option.innerHTML="Altro"
            formconsegna.appendChild(option)                
        } 
    }

    function handleSubmit(id){
        console.log(id)
        const datiDestinazione={
            idPrenotazione:window.sessionStorage.getItem("idPrenotazione"),
            parcheggioritiro:document.getElementById("opzioniritiro").value,
            parcheggioconsegna:document.getElementById("opzioniconsegna").value,
            indirizzodiverso:document.getElementById("Indirizzodiverso").value,
            cap:document.getElementById("Cap").value,
            citta:document.getElementById("Citta").value
        }
        console.log(datiDestinazione)
        axios.post("http://localhost:5000/prenotazioni/modificacorsa",datiDestinazione)
        .then((res)=>{
            console.log(res)
            window.sessionStorage.removeItem("idPrenotazione")
            window.location.href="/SchermataGestionePrenotazioni"
        }).catch((err)=>{
            console.log(err)
        })
    }

    useEffect(()=>{
        axios.post("http://localhost:5000/mezzi/recuperaparcheggi")
        .then((res)=>{
            console.log(res)
            compilaform(res.data)
        }).catch((err)=>{
            console.log(err)
        })        
    },[])

    return(        
    <div style={{height:800, paddingTop:100, backgroundImage: `url(${"../images/sfondoSchermate.jpg"})`}}>
        <div className="container-fluid" style={{maxWidth:400, alignContent:'center', paddingTop:10, paddingBottom:10,backgroundColor:"#d6d6f5"}}>
            <div className="TitoloForm" style={{backgroundColor:"blue", textAlign:"center", color:"white", borderRadius:10}}>
            <h2>Modifica Prenotazione</h2>
            </div>
        <div class="container" style={{maxWidth:400, paddingTop:20}}>
        <Form>

        <Form.Group className="mb-3" >
            <Form.Label ><strong>Parcheggio/Stallo ritiro</strong></Form.Label>
                <select className="form-select mb3" id="opzioniritiro">
                
                </select>
        </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label ><strong>Parcheggio/Stallo consegna</strong></Form.Label>                        
        <select className="form-select mb3" id="opzioniconsegna" onChange={handleChange}>
        
        </select>
        <Collapse in={open}>
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
    </Form.Group>    
    <Button variant="primary" onClick={(id)=>{handleSubmit(id)}}>
        Modifica
    </Button>    
    </Form>
    </div>
    </div>
    </div>
    
    )
}

export default SchermataModificaPrenotazione