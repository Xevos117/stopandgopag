 
import {React, useEffect, useState} from 'react';
import { Table} from 'react-bootstrap';
import PopupAttenzione from '../Generali/Generali/PopupAttenzione'
require('bootstrap')
const axios = require('axios');
let i=0 
let flag=false
let bottonecliccato
let carte={}

function TabDatiPagamento(){
  const [show, setShow] = useState(false);
  
  const showOverlay=(bottone)=>{      //questa funzione mi serve per passare la props all'overlay in caso di conferma
    console.log("Cliccato "+bottone)
    let riga=document.getElementById(bottone).parentNode.parentNode
    console.log(riga.id)
    bottonecliccato=riga.id     //setto la props che verrà passata all'overlay
    setShow(true)         //mostro l'overlay    
  }

  const eliminaDatoPagamento=(idutente)=>{
    console.log("EliminaDatoPagamento dice: "+idutente)
    console.log("NumCarta"+bottonecliccato)
    console.log(carte[bottonecliccato])
    
    axios.post("http://localhost:5000/utente/eliminaDatoPagamento",{numCarta:carte[bottonecliccato]})
        .then((res)=>{            
            console.log("<Tabella")            
        }).catch(err=>{
            console.log(err)
        }) 
    window.location.reload()
  }


  const modificaDatoPagamento=(bottone)=>{
    console.log("Cliccato "+bottone)
    let riga=document.getElementById(bottone).parentNode.parentNode
    console.log(carte[riga.id])
    window.sessionStorage.setItem("cartaselezionata",carte[riga.id])
    /*axios.post("http://localhost:5000/utente/ricevidatiutente",{numCarta:riga.id})
        .then((res)=>{
            console.log("Tabella")
            console.log(res.data)
            window.sessionStorage.setItem("datopagamentocliccato",riga.id)
        }).catch(err=>{
            console.log(err)
        })
      */
    window.location.href="/ModificaDatoPagamento"
  }
  
  useEffect(()=>{   
    console.log("QUI2")   
    let id=JSON.parse(window.sessionStorage.getItem("utente"))
    axios.post("http://localhost:5000/utente/recuperaDatiPagamento",{IdUserid:id.IdUserid},{withCredentials:true})
      .then((res)=>{
          console.log("eccomi")
          console.log(res.data)
          listaDatiPagamento(res.data)
      }).catch(err=>{
          console.log(err)
      })        
  })
  
  const listaDatiPagamento=(datiTabella)=>{
    if(flag===false){
      var tabella=document.getElementById("tabellaDatiPagamento")
      var tbody=tabella.tBodies[0]
      console.log(datiTabella)      
      console.log(datiTabella[0]+" dati db")
      var tr, td0,button, td1, td2, td3, td4, td5, td6,tdelimina,button2
      for(i=0;i<datiTabella.length;i++){
        console.log(datiTabella[i])
        console.log(datiTabella[i].NomeInt)
        tr=document.createElement("tr")
        tr.scope="row"
        tr.id=i
          td0=document.createElement("td")
          button=document.createElement("button")
          button.type="button"
          button.id="Modifica"+i
          button.className="btn btn-primary"
          button.innerHTML="Modifica"
          let modifica=function(){modificaDatoPagamento(this.id);}
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
          td1.innerHTML=datiTabella[i].NomeInt
          td2=document.createElement("td")
          td2.innerHTML=datiTabella[i].CognomeInt
          td3=document.createElement("td")
          td3.innerHTML=datiTabella[i].CartaDiCredito
          td3.id="NumCarta"+i
          carte[i]=datiTabella[i].CartaDiCredito
          td4=document.createElement("td")
          td4.innerHTML=datiTabella[i].MeseScadenza
          td5=document.createElement("td")
          td5.innerHTML=datiTabella[i].AnnoScadenza
          td6=document.createElement("td")
          td6.innerHTML=datiTabella[i].CartaDiCreditoCVV
          
          tr.appendChild(td0)
          tr.appendChild(tdelimina)
          tr.appendChild(td1)
          tr.appendChild(td2)
          tr.appendChild(td3)
          tr.appendChild(td4)
          tr.appendChild(td5)
          tr.appendChild(td6)
          
          tbody.appendChild(tr)
          console.log("Terminato "+ tbody)
          flag=true
        }
    }
  }

  return (
    <div style={{paddingTop:20, paddingLeft:30, paddingRight:40}}>
 
    <Table responsive striped bordered id="tabellaDatiPagamento">
     <thead>
       <tr>
         <th>Modifica</th>
         <th>Elimina</th>
         <th>Nome intestatario</th> 
         <th>Cognome intestatario</th>
         <th>Carta di credito</th>
         <th>Mese scad.</th>
         <th>Anno scad.</th>
         <th>CVV</th>
         
             
       </tr>
     </thead>
     <tbody id="corpoTabellaDatiPagamento">
       
     </tbody>
   </Table>

  
        <PopupAttenzione
          show={show}
          onHide={() => setShow(false)}  
          onConfirm={()=>eliminaDatoPagamento(bottonecliccato)}
          titolo={"Elimina dato Pagamento"}
          stringAttenzione={"Sei sicuro di voler eliminare questo dato di pagamento? Questa operazione non è reversibile"}
        />
    
  </div>
  );
}




export default TabDatiPagamento;