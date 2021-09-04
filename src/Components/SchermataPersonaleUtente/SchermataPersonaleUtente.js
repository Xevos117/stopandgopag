import {Row,Col, Button} from "react-bootstrap"
import {useEffect,useState} from "react"
const axios = require('axios')

let i =0
let datiUtente={}

function SchermataPersonaleUtente(){

 const [isLoading,setLoading]=useState(true)
 const [datiUtente, setDatiUtente]=useState({})

    function inizializzariepilogo(datiUtente){
        let utente=JSON.parse(window.sessionStorage.getItem("utente")).Ruolo
        let div=document.getElementById("riepilogoutente")
        console.log(datiUtente.length)
        for(i=0;i<datiUtente.length;i++){
            console.log(i)
            if(datiUtente.IdUserid===JSON.parse(window.sessionStorage.getItem("utente")).IdUserid){
                console.log(i)
                break;
            }
        }
        let p=document.createElement("p")
        p.innerHTML="<strong>Codice Cliente: </strong>"+datiUtente[i].IdUserid
        div.appendChild(p)
        p=document.createElement("p")            
        p.innerHTML="<strong>Nome: </strong>"+datiUtente[i].Nome
        div.appendChild(p)
        p=document.createElement("p")            
        p.innerHTML="<strong>Cognome: </strong>"+datiUtente[i].Cognome
        div.appendChild(p)
        p=document.createElement("p")            
        p.innerHTML="<strong>Data di nascita: </strong>"+datiUtente[i].DataNascita.substr(0,10)
        div.appendChild(p)
        p=document.createElement("p")            
        p.innerHTML="<strong>Codice Fiscale: </strong>"+datiUtente[i].CodiceFiscale
        div.appendChild(p)
        p=document.createElement("p")
        p.innerHTML="<strong>Telefono: </strong>"+datiUtente[i].Telefono
        div.appendChild(p)
        p=document.createElement("p")            
        p.innerHTML="<strong>Email: </strong>"+datiUtente[i].Email
        div.appendChild(p)

        console.log(datiUtente)
        console.log(datiUtente[i])
        if(utente==="Cliente"){
            
            p.innerHTML="<strong>Comune Domicilio: </strong>"+datiUtente[i].DomComune
            div.appendChild(p)
            p=document.createElement("p")            
            p.innerHTML="<strong>Regione Domicilio: </strong>"+datiUtente[i].DomRegione
            div.appendChild(p)
            p=document.createElement("p")            
            p.innerHTML="<strong>Cap Domicilio: </strong>"+datiUtente[i].DomCAP
            div.appendChild(p)
            p=document.createElement("p")            
            p.innerHTML="<strong>Indirizzo domicilio: </strong>"+datiUtente[i].DomIndirizzo
            div.appendChild(p)
            p=document.createElement("p")   
            if(datiUtente[i].DispositivoPortatile===1){
                p.innerHTML="<strong>Dispositivo Portatile: </strong>"+"Si"
            }     
            else{
                p.innerHTML="<strong>Dispositivo Portatile: </strong>"+"No"
            }
            div.appendChild(p)
        }
        else if(utente==="Cliente" || utente==="Autista"){
            let p=document.createElement("p")
            p.innerHTML="<strong>Numero patente: </strong>"+datiUtente[i].Patente
            div.appendChild(p)
        }
        else if(utente==="Gestore Parcheggio"){
            let p=document.createElement("p")
            p.innerHTML="<strong>Gestore del parcheggio: </strong>"+"dati array"
            div.appendChild(p)
        }
    }

    function cliccaModifica(){
        let utente=JSON.parse(window.sessionStorage.getItem("utente")).Ruolo
        if(utente==="Cliente"){
            let id=JSON.parse(window.sessionStorage.getItem("utente")).IdUserid
            console.log(id)
            window.sessionStorage.setItem("utenteselezionato",id)
            window.location.href="/SchermataModificaCliente"
        }
        else{
            let id=JSON.parse(window.sessionStorage.getItem("utente")).IdUserid
            console.log(id)
            window.sessionStorage.setItem("dipendenteselezionato",id)
            window.location.href="/SchermataModificaDipendente"
        }
    }

 

    /*useEffect(()=>{        
        if(JSON.parse(window.sessionStorage.getItem("utente")).Ruolo==="Cliente"){
        axios.post("http://localhost:5000/utente/ricevidatiutente",{withCredentials:true})
        .then((res)=>{
            console.log(res.data) 
            for(i;i<res.data.lenght;i++){
                if(res.data[i].IdUserid===JSON.parse(window.sessionStorage.getItem("utente")).IdUserid){
                    setDatiUtente(res.data[i])
                }
                console.log(datiUtente)

            }   
            //inizializzariepilogo(res.data)
    
            }).catch(err=>{
                console.log(err)
            })
            console.log(datiUtente)
        }
        else{
            axios.post("http://localhost:5000/utente/riceviDatiDipendenti",{withCredentials:true})
        .then((res)=>{
            console.log(res.data)
            inizializzariepilogo(res.data) 
 
            for(i;i<res.data.length;i++){
                if(res.data[i].IdUserid===JSON.parse(window.sessionStorage.getItem("utente")).IdUserid){
                    setDatiUtente(res.data[i])
                    console.log("TROVATO")
                }
                console.log(res.data[i].IdUserid)
            }   
            console.log(datiUtente)
            }).catch(err=>{
                console.log(err)
            })
            console.log(datiUtente)
        }
},[])*/
    useEffect(()=>{
        if(JSON.parse(window.sessionStorage.getItem("utente")).Ruolo==="Cliente"){
            axios.post("http://localhost:5000/utente/ricevidatiutente",{withCredentials:true})
            .then((res)=>{
                 for(i;i<res.data.length;i++){
                    if(res.data[i].IdUserid===JSON.parse(window.sessionStorage.getItem("utente")).IdUserid){
                        setDatiUtente(res.data[i])
                        setLoading(false)
                        break
                    }
                }   
                }).catch(err=>{
                    console.log(err)
                })
            }
            else{
                axios.post("http://localhost:5000/utente/riceviDatiDipendenti",{withCredentials:true})
            .then((res)=>{
                for(i;i<res.data.length;i++){
                    if(res.data[i].IdUserid===JSON.parse(window.sessionStorage.getItem("utente")).IdUserid){
                        setDatiUtente(res.data[i])
                        setDatiUtente(res.data[i])
                        setLoading(false)
                        break
                    }
                    console.log(res.data[i].IdUserid)
                }   
                }).catch(err=>{
                    console.log(err)
                })
            }
    },[])


    if(isLoading){
        return "Loading..."
    }

    if(JSON.parse(window.sessionStorage.getItem("utente"))===undefined){
        return "Non hai i permessi per stare qui"
    }

    if(JSON.parse(window.sessionStorage.getItem("utente")).Ruolo==="Cliente"){
        return(
            <div className="container" style={{minHeight:600, paddingTop:30, backgroundColor:"#f2f2f2"}}>
            <Row style={{backgroundColor:"#e6e6e6", marginTop:100}}>
                    <Col>
                    <h2>Riepilogo dati utente</h2>                 
                    <div className="container" id="riepilogoutente">
                        <p><strong>Codice Cliente: </strong>{datiUtente.IdCliente}</p>
                        <p><strong>Nome: </strong>{datiUtente.Nome}</p>
                        <p><strong>Cognome: </strong>{datiUtente.Cognome}</p>
                        <p><strong>Data di nascita: </strong>{new Date(datiUtente.DataNascita).toLocaleDateString()}</p>
                        <p><strong>Codice Fiscale: </strong>{datiUtente.CodiceFiscale}</p>
                        <p><strong>Telefono: </strong>{datiUtente.Telefono}</p>
                        <p><strong>Email: </strong>{datiUtente.Email}</p>
                        <p><strong>Comune Domicilio: </strong>{datiUtente.DomComune}</p>
                        <p><strong>Regione Domicilio: </strong>{datiUtente.DomRegione}</p>
                        <p><strong>Cap Domicilio: </strong>{datiUtente.DomCAP}</p>
                        <p><strong>Indirizzo domicilio: </strong>{datiUtente.DomIndirizzo}</p>
                        <p><strong>Dispositivo Portatile: </strong>{datiUtente.DispositivoPortatile ? "Si":"No"}</p>
                    </div>                            
                    </Col>
                    <Col>
                    <div id="Modificadati">                    
                        <Col> 
                        <Button style={{marginTop:10}} onClick={()=>cliccaModifica()}>
                            Modifica dati utente
                        </Button>                     
                        </Col> 
                    </div>  
                </Col>
                </Row>            
            </div>
        )
    }
    else{
        return(
            <div className="container" style={{minHeight:600, paddingTop:30, backgroundColor:"#f2f2f2"}}>
            <Row style={{backgroundColor:"#e6e6e6", marginTop:100}}>
                    <Col>
                    <h2>Riepilogo dati utente</h2>                 
                    <div className="container" id="riepilogoutente">
                        <p><strong>Codice Dipendente: </strong>{datiUtente.IdDipendente}</p>
                        <p><strong>Nome: </strong>{datiUtente.Nome}</p>
                        <p><strong>Cognome: </strong>{datiUtente.Cognome}</p>
                        <p><strong>Data di nascita: </strong>{new Date(datiUtente.DataNascita).toLocaleDateString()}</p>
                        <p><strong>Codice Fiscale: </strong>{datiUtente.CodiceFiscale}</p>
                        <p><strong>Telefono: </strong>{datiUtente.Telefono}</p>
                        <p><strong>Email: </strong>{JSON.parse(window.sessionStorage.getItem("utente")).Email}</p>     
                        <p><strong>Ruolo: </strong>{JSON.parse(window.sessionStorage.getItem("utente")).Ruolo}</p>                 
                    </div>                            
                    </Col>
                    <Col>
                    <div id="Modificadati">                    
                        <Col> 
                        <Button style={{marginTop:10}} onClick={()=>cliccaModifica()}>
                            Modifica dati utente
                        </Button>                     
                        </Col> 
                    </div>  
                </Col>
                </Row>            
            </div>
        )
    }
}

export default SchermataPersonaleUtente