import {React, useEffect, useState} from 'react';
import { Table} from 'react-bootstrap';
import PopupAttenzione from '../Generali/Generali/PopupAttenzione'
require('bootstrap')
const axios = require('axios');
let i=0 
let flag=false
let bottonecliccato
let cartedidentita={}

function TabDipendenti(){
  const [show, setShow] = useState(false);
  
  const showOverlay=(bottone)=>{      
    console.log("Cliccato "+bottone)
    let riga=document.getElementById(bottone).parentNode.parentNode
    console.log(riga.id)
    bottonecliccato=riga.id     
    setShow(true)           
  }

  const eliminaDipendente=(idutente)=>{   //da modificare nel nostro caso
    console.log("EliminaDipendente dice: "+idutente)  //da modificare nel nostro caso
    axios.post("http://localhost:5000/utente/eliminaDipendente",{idDipendente:cartedidentita[idutente]})  //da modificare nel nostro caso
        .then((res)=>{            
            console.log("<Tabella")
            
        }).catch(err=>{
            console.log(err)
        })
  
    window.location.reload()
  }


  const modificaDipendente=(bottone)=>{
    console.log("Cliccato "+bottone)
    let riga=document.getElementById(bottone).parentNode.parentNode
    console.log(riga.id)
    window.sessionStorage.setItem("dipendenteselezionato",cartedidentita[riga.id])
    window.location.href="/SchermataModificaDipendente"
  }

  useEffect(()=>{      
    axios.post("http://localhost:5000/utente/ricevidatidipendenti") //da modificare nel nostro caso
      .then((res)=>{
          console.log(res.data)
          listaDipendenti(res.data)
      }).catch(err=>{
          console.log(err)
      })        
  })
  
  const listaDipendenti=(datiTabella)=>{
    if(flag===false){
      var tabella=document.getElementById("tabellaDipendenti")
      var tbody=tabella.tBodies[0]
      console.log(datiTabella)
      
      console.log(datiTabella[0]+" dati db")
      var tr, td0,button, td1, td2, td3, td4, td5, td6, td7, td8, td9, td10, td11, td12,tdelimina,button2
      for(i=0;i<datiTabella.length;i++){
        tr=document.createElement("tr")
        tr.scope="row"
        tr.id=i
          td0=document.createElement("td")
          button=document.createElement("button")
          button.type="button"
          button.id="Modifica"+i
          button.className="btn btn-primary"
          button.innerHTML="Modifica"
          let modifica=function(){modificaDipendente(this.id);}
          button.addEventListener('click',modifica,false)
          td0.appendChild(button)
          console.log(td0)       
          tdelimina=document.createElement("td")
          button2=document.createElement("button")
          button2.type="button"
          button2.id="Elimina"+i
          button2.className="btn btn-danger"
          button2.innerHTML="Elimina"
          if(i===0){
            button2.disabled=true                     //Non è possibile eliminare l'utente admin 
          }
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
          td5.innerHTML=datiTabella[i].DataNascita.substr(0,10)
          td6=document.createElement("td")
          td6.innerHTML=datiTabella[i].CodiceFiscale
          td7=document.createElement("td")
          td7.innerHTML=datiTabella[i].CartaDIdentita //INSERIRLA NEL DB!!!!!
          cartedidentita[i]=datiTabella[i].IdUserid
          td8=document.createElement("td")
          td8.innerHTML=datiTabella[i].Patente
          td9=document.createElement("td")
          td9.innerHTML=datiTabella[i].Telefono
          td10=document.createElement("td")
          td10.innerHTML=datiTabella[i].Iban
          td11=document.createElement("td")
          td11.innerHTML=datiTabella[i].TariffaAutista
          td12=document.createElement("td")
          td12.innerHTML=datiTabella[i].Ruolo
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
          tbody.appendChild(tr)
          console.log("Terminato "+ tbody)
          flag=true
        }
        console.log(cartedidentita)
    }
  }

  return (
 
 <div style={{paddingTop:20, paddingLeft:30, paddingRight:40}}>
 
 <Table responsive striped bordered id="tabellaDipendenti">
  <thead>
    <tr>
      <th>Modifica</th>
      <th>Elimina</th>
      <th>Nome</th> 
      <th>Cognome</th>
      <th>Email</th>
      <th>Data di nascita</th>
      <th>Cod. Fiscale</th>
      <th>Num. Carta identità</th>
      <th>Num. Patente</th>
      <th>Num. Telefono</th>
      <th>Iban</th>
      <th>Tariffa ora</th>
      <th>Ruolo</th>
          
    </tr>
  </thead>
  <tbody id="corpoTabellaDipendenti">
    
  </tbody>
</Table>

  
        <PopupAttenzione
          show={show}
          onHide={() => setShow(false)}  
          onConfirm={()=>eliminaDipendente(bottonecliccato)}
          stringAttenzione={"Sei sicuro di voler eliminare questo dipendente? Questa operazione non è reversibile"}
        />
    
  </div>
  );
}




export default TabDipendenti;
  