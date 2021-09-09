import Tabella from "../Generali/Generali/Tabella";
import PopupAttenzione from '../Generali/Generali/PopupAttenzione'
import {React, useState, useEffect} from 'react';
require('bootstrap')

const axios=require('axios')
let bottonecliccato

function ListaCorse(){
  const [show, setShow] = useState(false);
  const [isLoading, setLoading]=useState(true)
  const [mezzi, setMezzi]=useState()
  const [array,setArray]=useState()

  function jsontoarray(prenotazione){  
    let tmp=[]
      for(let i=0; i<prenotazione.length;i++){
        tmp[i]=[prenotazione[i].IdPrenotazione, prenotazione[i].IdCliente, prenotazione[i].TargaMatricola, new Date(prenotazione[i].DataOraRitiro).toLocaleString(), new Date(prenotazione[i].DataOraConsegnaProgrammata).toLocaleString(),prenotazione[i].IdAutista, prenotazione[i].ConfermaCorsa]
      }
      setArray(tmp)
      setLoading(false)
    }

    function modifica(){
      window.location.href="/SchermataModificaPrenotazione"
    }

    function rifiuta(id){
      console.log(id)
      let idriga=document.getElementById(id).parentNode.parentNode.id
      console.log(idriga)
      let idPrenotazione=document.getElementById("DatoTabella"+0+"riga"+idriga).getInnerHTML()
      console.log(idPrenotazione)
      axios.post("http://localhost:5000/prenotazioni/rifiutacorsa",{idPrenotazione:idPrenotazione})
      .then((res)=>{
        console.log(res)
        window.location.reload()
      }).catch((err)=>{
        console.log(err)
      })
    }

    function accetta(id){
      console.log(id)
      let idriga=document.getElementById(id).parentNode.parentNode.id
      console.log(idriga)
      let idPrenotazione=document.getElementById("DatoTabella"+0+"riga"+idriga).getInnerHTML()
      console.log(idPrenotazione)
      console.log(mezzi[idriga.IdAutista])

      axios.post("http://localhost:5000/prenotazioni/accettacorsa",{idAutistaPrenotazioni:mezzi[idriga].IdAutistaPrenotazioni, idAutista:mezzi[idriga].IdAutistaPreassegnato, idPrenotazione:idPrenotazione})
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
      console.log(mezzi)
      window.sessionStorage.setItem("prenotazioneselezionata",JSON.stringify(mezzi[veicoloid]))
      window.location.href="/GestionePrenotazione"
    }

  useEffect(()=>{
    let idutente=JSON.parse(window.sessionStorage.getItem("utente")).IdUserid
    axios.post("http://localhost:5000/prenotazioni/richiediprenotazioni",{id:idutente})
    .then((res)=>{
      console.log(res)
        setMezzi(res.data)
     // console.log(array)
      jsontoarray(res.data)
    }).catch((err)=>{
      console.log(err)  
    })
  },[])

  if(isLoading){
    return "Loading......"
  }

    return(
        <>
        <h1 style={{paddingLeft:30, paddingTop:40, paddingBottom:5}}>Lista Prenotazioni</h1>

        <Tabella 
        intestazioni={["Accetta","Rifiuta","Codice Prenotazione", "Codice Cliente", "Targa/Matricola mezzo","Data/ora inizio","Data/ora fine","Codice autista"]}
        righe={array}
        seleziona={true}
        modificaelimina={true}
        modifica={(id)=>{accetta(id)}}
        elimina={(id)=>{setShow(true);bottonecliccato=id}}
        autistamode={true}
        selezionafunction={seleziona}
        />

        <PopupAttenzione
          show={show}
          onHide={() => setShow(false)}  
          onConfirm={(id)=>{setShow(false);rifiuta(bottonecliccato)}}
          stringAttenzione={"Sei sicuro di voler rifiutare questa prenotazione? Questa operazione non è reversibile"}
        />
        </>
    )
}

export default ListaCorse