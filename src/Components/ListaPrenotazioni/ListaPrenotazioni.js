import Tabella from "../Generali/Generali/Tabella";
import PopupAttenzione from '../Generali/Generali/PopupAttenzione'
import {React, useState, useEffect} from 'react';
import {Button} from "react-bootstrap"
const axios = require('axios')
require('bootstrap')
let mezzi=[]
let array=[]  
let ready=false    
let cliente=false
let bottonecliccato

function ListaPrenotazioni(){
  const [show, setShow] = useState(false);
  const [isloading, setLoading] = useState(true);
  console.log("TABella")
  const [modificaelimina, setModElimina]=useState(true)
  const [disabled, setDisabled]=useState(false)


  function modifica(id){
    console.log(id)
    let c=document.getElementById(id)
    window.sessionStorage.setItem("idPrenotazione",document.getElementById("DatoTabella0riga"+c.parentNode.parentNode.id).getInnerHTML())
    window.location.href="/SchermataModificaPrenotazione"
  }

if(JSON.parse(window.sessionStorage.getItem("utente")).Ruolo==="Cliente"){
  cliente=true
}
  
   
  function jsontoarray(){  
    for(let i=0; i<mezzi.length;i++){
      array[i]=[mezzi[i].IdPrenotazione, mezzi[i].IdCliente, mezzi[i].TargaMatricola, new Date(mezzi[i].DataOraRitiro).toLocaleString(), new Date(mezzi[i].DataOraConsegnaProgrammata).toLocaleString(), mezzi[i].IdAutista, mezzi[i].CorsaAvviata, mezzi[i].CorsaConclusa]
    }
      console.log(array)
      ready=true
  }

  function elimina(id){
    console.log(id)
    let idriga=document.getElementById(id).parentNode.parentNode.id
    console.log(idriga)
    let idPrenotazione=document.getElementById("DatoTabella"+0+"riga"+idriga).getInnerHTML()
    axios.post("http://localhost:5000/prenotazioni/eliminaPrenotazione",{idPrenotazione:idPrenotazione})
    .then((res)=>{
      console.log(res)
      window.location.reload()
    }).catch((err)=>{
      console.log(err)
    })
  }

  function seleziona(id){
    console.log(id)
    let veicoloid=document.getElementById(id).parentNode.parentNode.id
    console.log(mezzi[veicoloid])
    window.sessionStorage.setItem("prenotazioneselezionata",JSON.stringify(mezzi[veicoloid]))
    window.location.href="/GestionePrenotazione"
  }

  useEffect(()=>{
    let idutente=JSON.parse(window.sessionStorage.getItem("utente")).IdUserid
    console.log("TABELLA")
    if(JSON.parse(window.sessionStorage.getItem("utente")).Ruolo==="GestoreParcheggio"){
      setModElimina(false)
      setDisabled(true)
      console.log("Gestore parcheggio")
      axios.post("http://localhost:5000/mezzi/recuperaparcheggi")
        .then((res)=>{
            for(let i=0; i<res.data.length;i++){
              if(parseInt(res.data[i].Gestore)===idutente){
                console.log("Trovato")
                console.log(res.data[i])
                axios.post("http://localhost:5000/prenotazioni/richiedicorseparcheggio",{id:res.data[i].IdParcheggioStallo})
                .then((res)=>{
                  console.log(res)
                  mezzi=res.data
                  setModElimina(false)
                  jsontoarray()
                  setTimeout(setLoading(false),1000)
                }).catch((err)=>{
                  console.log(err)
                })
              }
            }
        }).catch((err)=>{
            console.log(err)
        })      
    }
    let dati
    if(JSON.parse(window.sessionStorage.getItem("utente")).Ruolo==="Amministratore"){
      dati={id:"%"}
    }
    else{
      dati={id:idutente}
    }
    
    if(JSON.parse(window.sessionStorage.getItem("utente")).Ruolo!=="GestoreParcheggio"){
      axios.post("http://localhost:5000/prenotazioni/richiediprenotazioni",dati)
      .then((res)=>{
        console.log(res)
        mezzi=res.data
        console.log(mezzi)
        jsontoarray()
        setLoading(false)
      }).catch((err)=>{
        console.log(err)  
      })
    }
  },[])

  if(isloading){
    return "Loading"
  }

    return(
        <>
        <h1 style={{paddingLeft:30, paddingTop:40, paddingBottom:5}}>Lista Prenotazioni</h1>

        <div style={{paddingLeft:30}}>        
          <Button href="/" id="inserisci" disabled={disabled}>Inserisci</Button>       
        </div>

        <Tabella 
        intestazioni={["Modifica","Elimina","Codice Prenotazione", "Codice Cliente", "Targa/Matricola mezzo","Data/ora inizio","Data/ora fine","Codice autista"]}
        righe={array}
        seleziona={true}
        modificaelimina={modificaelimina}
        modifica={(id)=>{modifica(id)}}
        elimina={(id)=>{setShow(true);bottonecliccato=id}}
        selezionafunction={seleziona}
        clientemode={cliente}
        
        />
        

        <PopupAttenzione
          show={show}
          onHide={() => setShow(false)}  
          onConfirm={()=>{setShow(false);elimina(bottonecliccato)}}
          stringAttenzione={"Sei sicuro di voler eliminare questa prenotazione? Questa operazione non ?? reversibile"}
        />
        </>
    )
  }
  


export default ListaPrenotazioni