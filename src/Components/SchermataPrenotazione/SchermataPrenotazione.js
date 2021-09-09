import {Row,Col, Collapse, Button, Form} from "react-bootstrap"
import {useState,useEffect} from 'react'
import PopupSuccesso from "../Generali/Generali/PopupSuccesso"
import PopupErrore from "../Generali/Generali/PopupErrore"
const axios=require('axios')

  let stringabottone="Dettagli pagamento"
  let stringariepilogo="Prenotazione"
  let tariffa
function SchermataPrenotazione(){
    if(!JSON.parse(window.sessionStorage.getItem("utente"))){
        alert("Effettua l'accesso per continuare")
        window.location.href="/Login"
    }
    else if(!JSON.parse(window.sessionStorage.getItem("specificheprenotazione"))){
        window.location.href="/"
    }

    let macchine=JSON.parse(window.sessionStorage.getItem("specificheprenotazione"))
    console.log(macchine)

    const [open, setOpen] = useState(true); //primoform
    const [open2, setOpen2] = useState(false);//secondoform
    const [open3, setOpen3] = useState(false);//indirizzodiverso
    const [show, setShow] = useState(false);  //per mostrare o nascondere il popupSuccesso
    const [show2, setShow2] = useState(false);  //per mostrare o nascondere il popupSuccesso per prenotazione
    const [showErrore, setShowErrore] = useState(false)

    function handleChange(){
        let c=document.getElementById("opzioniconsegna").value
        console.log(document.getElementById("opzioniconsegna").value==="altro")
        if(document.getElementById("opzioniconsegna").value==="altro"){
            document.getElementById("Indirizzodiverso").required=true
            document.getElementById("Cap").required=true
            document.getElementById("Citta").required=true
            setOpen3(true)
        }
        else{
            document.getElementById("Indirizzodiverso").required=false
            document.getElementById("Cap").required=false
            document.getElementById("Citta").required=false
            document.getElementById("Indirizzodiverso").value=""
            document.getElementById("Cap").value=""
            document.getElementById("Citta").value=""
            setOpen3(false)
        }
    }

    function recuperoDatiPagamento(){
        console.log("Datipagamento")
        let id=JSON.parse(window.sessionStorage.getItem("utente")).IdUserid
        axios.post("http://localhost:5000/utente/recuperaDatiPagamento",{IdUserid:id},{withCredentials:true})
        .then((res)=>{
            console.log(res.data.length)
            if(res.data.length===0 && JSON.parse(window.sessionStorage.getItem("utente")).Ruolo==="Cliente"){
                setShowErrore(true)
                return
            }
            else{
                console.log("res.data.length")
                compilaform(res.data)
            }
            
        })
        .catch((err)=>{

            console.log(err)
        })


        function compilaform(dati){
            let form=document.getElementById("metodopagamento")
            let option
            if(form.length===0){
                for(let i=0;i<dati.length;i++){
                    option=document.createElement("option")
                    option.value=dati[i].IdClienteTipiDiPagamento
                    option.innerHTML="Carta Numero: "+dati[i].CartaDiCredito.substr(0,3)+"****"
                    form.appendChild(option)
                }  
            }          
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
            let formritiro=document.getElementById("opzioniritiro")
            let formconsegna=document.getElementById("opzioniconsegna")
            console.log(dati)
            let option
            if(formritiro.length===0){
                for(let i=0;i<dati.length;i++){
                    option=document.createElement("option")
                    option.value=dati[i].IdParcheggioStallo
                    option.id=dati[i].IdParcheggioStallo
                    option.innerHTML=dati[i].DescParcheggioStallo
                    console.log(option)
                    formritiro.appendChild(option)
                }  
                for(let i=0;i<dati.length;i++){
                    option=document.createElement("option")
                    option.value=dati[i].IdParcheggioStallo
                    option.id=dati[i].IdParcheggioStallo
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
    }

    function calcoloTariffa(){
        let dati=JSON.parse(window.sessionStorage.getItem("specificheprenotazione"))
        let prova=new Date(dati[0].dataOraInizio)
        let prova2=new Date(dati[0].dataOraFine)
        let giorni=prova2.getDate()-prova.getDate()
        console.log(giorni)
        let mese=(prova2.getMonth()+1)-(prova.getMonth()+1)
        let anno=(prova2.getFullYear()-prova2.getFullYear())
        let differenzaore=prova2.getHours()-prova.getHours()
        if(giorni>=1){
            let ore=giorni*24+differenzaore
            console.log(dati[1].Tariffa)
            return ore*dati[1].Tariffa
        }
        else if(mese>=1){
            let ore=mese*30*24+differenzaore
            return (ore/3)*dati[1].Tariffa
        }
        else{
            return differenzaore*dati[1].Tariffa
        }        
    }

    function bottoneform(){
        var form
        if(open===true){
            stringabottone="Dettagli prenotazioni"
            form=document.getElementById("formdettagliparcheggio")
            if(form.checkValidity()===true){
                stringariepilogo="Pagamento"
                setOpen(false)
                setOpen2(true)
            }
        }
        else{
            stringabottone="Dettagli pagamento"
            stringariepilogo="Prenotazione"
            setOpen2(false)
            setOpen(true)
        }
    }

    function confermaPrenotazione(){
        let specifiche=JSON.parse(window.sessionStorage.getItem("specificheprenotazione"))
        let datiPrenotazione={
            idutente:JSON.parse(window.sessionStorage.getItem("utente")).IdUserid,
            email:JSON.parse(window.sessionStorage.getItem("utente")).Email,
            idmezzo:specifiche[1].IdMezzo,
            idparcheggioritiro:document.getElementById("opzioniritiro").value,
            idparcheggioconsegna:document.getElementById("opzioniconsegna").value,
            dataorafine:specifiche[0].dataOraFine,
            dataorainizio:specifiche[0].dataOraInizio,
            diversoindirizzo:document.getElementById("Indirizzodiverso").value,
            diversocitta:document.getElementById("Citta").value,
            diversoCAP:document.getElementById("Cap").value,
            idpagamento:document.getElementById("metodopagamento").value,
            tariffautista:15,
            tariffamezzo:macchine[1].Tariffa,
            tempo:calcoloTariffa(),
            mancia:document.getElementById("mancia").value,
            tariffasovrapprezzo:macchine[1].TariffaSovrapprezzo,
            autista:specifiche[0].autista,
            nomeparcheggioritiro:document.getElementById("opzioniritiro").selectedOptions[0].outerText,
            nomeparcheggioconsegna:document.getElementById("opzioniconsegna").selectedOptions[0].outerText,
            totale:tariffa
        }
        if(JSON.parse(window.sessionStorage.getItem("utente")).Ruolo==='Amministratore'){
            datiPrenotazione.idutente=specifiche[0].idCliente
            datiPrenotazione.idpagamento=null
            console.log("cambio id")
        }
        console.log(datiPrenotazione)
        axios.post("http://localhost:5000/prenotazioni/inserisciprenotazione",datiPrenotazione)
        .then((res)=>{
            console.log(res)
            if(datiPrenotazione.autista===true){
                assegnaAutista({idPrenotazione:res.data[0].insertId, dataorainizio:datiPrenotazione.dataorainizio, dataorafine:datiPrenotazione.dataorafine,mancia:datiPrenotazione.mancia})
            }
           setShow2(true)
        })
        .catch((err)=>{
            console.log(err)
        })
        setShow2(true)
    }

    

    function assegnaAutista(datiPrenotazione){
        console.log("qui")
        axios.post("http://localhost:5000/prenotazioni/assegnazioneautisti",datiPrenotazione)
        .then((res)=>{
            console.log(res)
        }).catch((err)=>{
            console.log(err)
        })
    }

    useEffect(()=>{
        recuperoParcheggi()
        tariffa=calcoloTariffa()
    },[])

    return(
        <>
        <div className="container" style={{minHeight:600, paddingTop:30, backgroundColor:"#f2f2f2"}}>
            <Row>
                <Col>
                <img src="../images/opelCrossland.png"></img>
                </Col>
                <Col>
                <h3><strong>{macchine[1].Modello}</strong></h3>
                <p>{macchine[1].DescMezzo}</p>
                <p><strong>Alimentazione: </strong><text>{macchine[1].Alimentazione}</text> <strong style={{marginLeft:10}}>Numero Posti: </strong><text>{macchine[1].Posti}</text></p>
                <h5>Optional</h5>
                <p>
                    <ul>
                        <li>{macchine[1].Optional}</li>
                    </ul>
                </p>

                </Col>
            </Row>   
            <Row style={{backgroundColor:"#e6e6e6"}}>
                <Col>
                <h2>Riepilogo {stringariepilogo}</h2> 
                <Collapse in={open}>
                <div id="riepilogo1">
                <p><strong>ID Cliente: </strong>{JSON.parse(window.sessionStorage.getItem("utente")).IdUserid}</p>  
                <p><strong>Modello: </strong> {macchine[1].Modello}</p>
                <p><strong>Data e ora di ritiro: </strong>{new Date(macchine[0].dataOraInizio).toLocaleDateString()+" "+macchine[0].dataOraInizio.substr(11,14)}</p> 
                <p><strong>Data e ora di consegna: </strong>{new Date(macchine[0].dataOraFine).toLocaleDateString()+" "+macchine[0].dataOraFine.substr(11,14)}</p> 
                </div>
                </Collapse> 
                <Collapse in={open2}>
                <div id="riepilogo2">
                    <p><strong>Tariffa autista: </strong>10€</p>  
                    <p><strong>Tariffa oraria mezzo: </strong>{macchine[1].Tariffa}€</p>
                    <Collapse in={open3}>
                    <p><strong>Tariffa destinazione diversa </strong>{macchine[1].TariffaSovrapprezzo}€</p> 
                    </Collapse>
                </div>
                </Collapse>               
                </Col>
                <Col>
                <Button
                    onClick={bottoneform}
                    aria-controls="example-collapse-text"
                    id="avanti"
                    aria-expanded={open}
                    style={{marginTop:10}}
                >
                    {stringabottone}
                </Button>                
                <Collapse in={open} style={{paddingBottom:30}} onEntered={recuperoParcheggi}>
                    <div id="parcheggio">
                    <Form id="formdettagliparcheggio">
                    <Form.Group as={Col} controlId="parcheggioritiro">
                        <Form.Label ><strong>Parcheggio/Stallo ritiro</strong></Form.Label>
                            <select className="form-select mb3" id="opzioniritiro">
                            
                            </select>
                    </Form.Group> 
                    <Form.Group as={Col} controlId="parcheggioconsegna">
                        <Form.Label ><strong>Parcheggio/Stallo consegna</strong></Form.Label>                        
                            <select className="form-select mb3" id="opzioniconsegna" onChange={handleChange}>
                            </select>
                    </Form.Group>  
                    
                    <Collapse in={open3}>
                        <div id="example-collapse-text">
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
                    <Collapse in={macchine[0].autista} >
                        <div id="collapse-autista">
                        <Row>
                            <Col>
                            <label for="exampleFormControlTextarea1"><strong>Note per autista</strong></label>
                            <textarea class="form-control" placeholder="Inserire eventuali note come: indirizzo di partenza, percorso..." id="descrizioneMezzo" rows="3"></textarea>
                        
                            </Col>
                            </Row>
                        </div>
                    </Collapse> 
                    
                    </Form>
                    </div>
                </Collapse>
                <Collapse in={open2} onEntered={recuperoDatiPagamento} >
                    <div id="selezionapagamento">
                    <Form>
                    <Form.Group className="mb-3" controlId="metodopagamento" >
                    <Form.Label><strong>Metodo Pagamento</strong></Form.Label>
                        <select className="form-select mb3" id="metodopagamento" onChange={handleChange}>
                            </select>
                    </Form.Group>
                    <Collapse in={macchine[0].autista}>
                        <Form.Group as={Col} controlId="mancia">
                            <Form.Label><strong>Mancia autista</strong></Form.Label>
                            <Form.Control id="mancia" type="number" placeholder=""  min="0" /*onChange={()=>{tariffa=tariffa+parseInt(document.getElementById("mancia").getInnerHTML()); document.getElementById("costo").innerHTML=tariffa}}*//>
                        </Form.Group>
                    </Collapse>
                    
                    </Form>
                    <p><strong  style={{fontSize:24}}>Totale: <strong id="costo">{tariffa}</strong>€</strong></p>
                    <Button variant="success" size="lg" onClick={()=>setShow(true)} style={{marginBottom:10}}>
                        Paga ora
                    </Button>
                    </div>
                </Collapse>
                </Col>
            </Row>                   
                                 
                                 
            </div>
            <PopupErrore
            show={showErrore}
            errore={"Nessun dato pagamento rilevato. Inserirne uno prima di prenotare"}
            onHide={()=>{setShow(false); window.location.href="/ListaDatiPagamento"}}
            />
            <PopupSuccesso
                id="popup"
                show={show}     
                onHide={()=>setShow(false)} 
                onConfirm={()=>{setShow(false);confermaPrenotazione()}}          
                titolo={"Confermare la prenotazione?"}
                stringAttenzione={"Cliccando continua verrà confermata definitivamente la prenotazione ed avverrà il pagamento"}
            />
            <PopupSuccesso
                id="popupeffettuata"
                show={show2}     
                onHide={()=>{setShow2(false); window.sessionStorage.removeItem("specificheprenotazione"); window.location.href="/SchermataGestionePrenotazioni"}} 
                onConfirm={()=>{setShow2(false); window.sessionStorage.removeItem("specificheprenotazione"); window.location.href="/SchermataGestionePrenotazioni"}}          
                titolo={"Prenotazione effettuata!"}
                stringAttenzione={"La sua prenotazione è stata inserita correttamente!"}
            />
        </>
    )
}

export default SchermataPrenotazione