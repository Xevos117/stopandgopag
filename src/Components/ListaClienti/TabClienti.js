/*import {React, useEffect} from 'react';
import { Table } from 'react-bootstrap';
require('bootstrap')

let dati=[        
{
   nome: 'stringanome',
   cognome: 'System Architect',
   email: 'Edinburgh',
   password: '61',
   indirizzo: '2011/04/25',
   citta: '$320',
   cap: 'Tiger Nixon',
   regione: 'System Architect',
   dataNascita: 'Edinburgh',
   codFiscale: '61',
   numCartaIdentita: '2011/04/25',
   numPatente: '$320',
   numTelefono: 'Edinburgh',
   foto: '61',
   pcSiNo: '2011/04/25'
 }
]

  function listaClienti(datiTabella){
    var tabella=document.getElementById("tabellaClienti")
    var tbody=tabella.tBodies[0]
    console.log(datiTabella.length)
    var i=0
    console.log(tbody)
    var tr, td0,button, td1, td2, td3, td4, td5, td6, td7, td8, td9, td10, td11, td12, td13, td14, td15
    for(i=0;i<datiTabella.length;i++){
      tr=document.createElement("tr")
      tr.scope="row"
      tr.id="riga"+i
        td0=document.createElement("td")
        button=document.createElement("button")
        button.type="button"
        button.id="Modifica"+i
        button.className="btn btn-primary"
        button.innerHTML="Modifica/Elimina"
        let modifica=function(){bottone(this.id);}
        button.addEventListener('click',modifica,false)
        td0.appendChild(button)
        console.log(td0)       
        td1=document.createElement("td")
        td1.innerHTML=datiTabella[i].nome
        td2=document.createElement("td")
        td2.innerHTML=datiTabella[i].cognome
        td3=document.createElement("td")
        td3.innerHTML=datiTabella[i].email
        td4=document.createElement("td")
        td4.innerHTML=datiTabella[i].password
        td5=document.createElement("td")
        td5.innerHTML=datiTabella[i].indirizzo
        td6=document.createElement("td")
        td6.innerHTML=datiTabella[i].citta
        td7=document.createElement("td")
        td7.innerHTML=datiTabella[i].cap
        td8=document.createElement("td")
        td8.innerHTML=datiTabella[i].regione
        td9=document.createElement("td")
        td9.innerHTML=datiTabella[i].dataNascita
        td10=document.createElement("td")
        td10.innerHTML=datiTabella[i].codFiscale
        td11=document.createElement("td")
        td11.innerHTML=datiTabella[i].numCartaIdentita
        td12=document.createElement("td")
        td12.innerHTML=datiTabella[i].numPatente
        td13=document.createElement("td")
        td13.innerHTML=datiTabella[i].numTelefono
        td14=document.createElement("td")
        td14.innerHTML=datiTabella[i].foto
        td15=document.createElement("td")
        td15.innerHTML=datiTabella[i].pcSiNo
        tr.appendChild(td0)
        tr.appendChild(td1)
        tr.appendChild(td2)
        tr.appendChild(td3)
        tr.appendChild(td4)
        tr.appendChild(td5)
        tr.appendChild(td6)
        tr.appendChild(td7)
        tr.appendChild(td8)
        tr.appendChild(td9)
        tr.appendChild(td10)
        tr.appendChild(td11)
        tr.appendChild(td12)
        tr.appendChild(td13)
        tr.appendChild(td14)
        tr.appendChild(td15)
        tbody.appendChild(tr)
        console.log("Terminato "+ tbody)
      }
  }

  function bottone(bottone){
    console.log("Cliccato "+bottone)
    let riga=document.getElementById(bottone).parentNode.parentNode
    console.log(riga.id)
    window.location.href="/SchermataGestioneCliente"
  }


  function TabClienti(){
    useEffect(()=>{
      listaClienti(dati)
    })
  return (
    <div style={{paddingTop:20, paddingLeft:30, paddingRight:40}}>
 
 <Table responsive striped bordered id="tabellaClienti">
  <thead>
    <tr>
      <th>Modifica/Elimina</th>
      <th>Nome</th> 
      <th>Cognome</th>
      <th>Email</th>
      <th>Password</th>
      <th>Indirizzo</th>
      <th>Città</th>
      <th>CAP</th>
      <th>Regione</th>
      <th>Data di nascita</th>
      <th>Cod. Fiscale</th>
      <th>Num. Carta identità</th>
      <th>Num. Patente</th>
      <th>Num. Telefono</th>
      <th>Foto</th>
      <th>Possiede pc</th>
      
          
    </tr>
  </thead>
  <tbody id="corpoTabellaClienti">
    
  </tbody>
</Table>
   
    
  </div>
  );
}

export default TabClienti; */
  


import {React, useEffect, useState} from 'react';
import { Table} from 'react-bootstrap';
import PopupAttenzione from '../Generali/Generali/PopupAttenzione'
require('bootstrap')
const axios = require('axios');
let i=0 
let flag=false
let bottonecliccato
let clienti={}

function TabClienti(){
  const [show, setShow] = useState(false);
  
  const showOverlay=(bottone)=>{      //questa funzione mi serve per passare la props all'overlay in caso di conferma
    console.log("Cliccato "+bottone)
    let riga=document.getElementById(bottone).parentNode.parentNode
    console.log(riga.id)
    bottonecliccato=riga.id     //setto la props che verrà passata all'overlay
    console.log(clienti[bottonecliccato])
    setShow(true)         //mostro l'overlay    
  }

  const eliminaCliente=(idutente)=>{
    console.log("EliminaCliente dice: "+idutente)
    axios.post("http://localhost:5000/utente/eliminaUtente",{IdCliente:clienti[bottonecliccato]})
        .then((res)=>{            
            console.log("<Tabella")
            
        }).catch(err=>{
            console.log(err)
        })
  
    window.location.href="/ListaClienti"
  }


  const modificaCliente=(bottone)=>{
    console.log("Cliccato "+bottone)
    let riga=document.getElementById(bottone).parentNode.parentNode
    console.log(riga.id)
    window.sessionStorage.setItem("utenteselezionato",clienti[riga.id])
    window.location.href="/SchermataModificaCliente"
  }

  useEffect(()=>{      
    axios.post("http://localhost:5000/utente/ricevidatiutente",{withCredentials:true})
      .then((res)=>{
          console.log(res.data)
          listaClienti(res.data)
      }).catch(err=>{
          console.log(err)
      })        
  })
  
  const listaClienti=(datiTabella)=>{
    if(flag===false){
      var tabella=document.getElementById("tabellaClienti")
      var tbody=tabella.tBodies[0]
      console.log(datiTabella.length)
      
      console.log(datiTabella[0]+" dati db")
      var tr, td0,button, td1, td2, td3, td4, td5, td6, td7, td8, td9, td10, td11, td12, td13, td14, td15, tdelimina,button2
      for(i=0;i<datiTabella.length;i++){
        clienti[i]=datiTabella[i].IdCliente
        tr=document.createElement("tr")
        tr.scope="row"
        tr.id=i
          td0=document.createElement("td")
          button=document.createElement("button")
          button.type="button"
          button.id="Modifica"+i
          button.className="btn btn-primary"
          button.innerHTML="Modifica"
          let modifica=function(){modificaCliente(this.id);}
          button.addEventListener('click',modifica,false)
          td0.appendChild(button)
          console.log(td0)       
          tdelimina=document.createElement("td")
          button2=document.createElement("button")
          button2.type="button"
          button2.id="Elimina"+i
          button2.className="btn btn-danger"
          button2.innerHTML="Elimina"
          let elimina=function(){showOverlay(this.id)}
          button2.addEventListener('click',elimina,false)
          tdelimina.appendChild(button2)
          td1=document.createElement("td")
          td1.innerHTML=datiTabella[i].Nome
          td2=document.createElement("td")
          td2.innerHTML=datiTabella[i].Cognome
          td3=document.createElement("td")
          td3.innerHTML=datiTabella[i].Email
          td5=document.createElement("td")
          td5.innerHTML=datiTabella[i].DomIndirizzo
          td6=document.createElement("td")
          td6.innerHTML=datiTabella[i].DomComune
          td7=document.createElement("td")
          td7.innerHTML=datiTabella[i].DomCAP
          td8=document.createElement("td")
          td8.innerHTML=datiTabella[i].DomRegione
          td9=document.createElement("td")
          td9.innerHTML=datiTabella[i].DataNascita.substr(0,10)
          console.log(typeof(datiTabella[i].DataNascita))
          td10=document.createElement("td")
          td10.innerHTML=datiTabella[i].CodiceFiscale
          td11=document.createElement("td")
          td11.innerHTML=datiTabella[i].CartaDIdentita
          td12=document.createElement("td")
          td12.innerHTML=datiTabella[i].Patente
          td13=document.createElement("td")
          td13.innerHTML=datiTabella[i].Telefono
          td14=document.createElement("td")
          td14.innerHTML=datiTabella[i].Foto
          td15=document.createElement("td")
          td15.innerHTML=datiTabella[i].DispositivoPortatile
          tr.appendChild(td0)
          tr.appendChild(tdelimina)
          tr.appendChild(td1)
          tr.appendChild(td2)
          tr.appendChild(td3)
          tr.appendChild(td5)
          tr.appendChild(td6)
          tr.appendChild(td7)
          tr.appendChild(td8)
          tr.appendChild(td9)
          tr.appendChild(td10)
          tr.appendChild(td11)
          tr.appendChild(td12)
          tr.appendChild(td13)
         // tr.appendChild(td14)
          tr.appendChild(td15)
          tbody.appendChild(tr)
          console.log("Terminato "+ tbody)
          flag=true
        }
    }
  }

  return (
    <div style={{paddingTop:20, paddingLeft:30, paddingRight:40}}>
 
    <Table responsive striped bordered id="tabellaClienti">
     <thead>
       <tr>
         <th>Modifica</th>
         <th>Elimina</th>
         <th>Nome</th> 
         <th>Cognome</th>
         <th>Email</th>
         <th>Indirizzo</th>
         <th>Città</th>
         <th>CAP</th>
         <th>Regione</th>
         <th>Data di nascita</th>
         <th>Cod. Fiscale</th>
         <th>Num. Carta identità</th>
         <th>Num. Patente</th>
         <th>Num. Telefono</th>
         <th>Possiede pc</th>
         
             
       </tr>
     </thead>
     <tbody id="corpoTabellaClienti">
       
     </tbody>
   </Table>
      
  
        <PopupAttenzione
          show={show}
          onHide={() => setShow(false)}  
          onConfirm={()=>eliminaCliente(bottonecliccato)}
          stringAttenzione={"Sei sicuro di voler eliminare questo cliente? Questa operazione non è reversibile"}
        />
    
  </div>
  );
}




export default TabClienti;
  