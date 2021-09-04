import {React, useEffect, useState} from 'react';
import { Table} from 'react-bootstrap';
import PopupAttenzione from '../Generali/Generali/PopupAttenzione'
require('bootstrap')
const axios = require('axios');
let i=0 
let flag=false
let bottonecliccato
let targhe={}
function TabMezzi(){
  const [show, setShow] = useState(false);
  
  const showOverlay=(bottone)=>{      //questa funzione mi serve per passare la props all'overlay in caso di conferma
    console.log("Cliccato "+bottone)
    let riga=document.getElementById(bottone).parentNode.parentNode
    console.log(riga.id)
    bottonecliccato=riga.id     //setto la props che verrà passata all'overlay
    setShow(true)         //mostro l'overlay    
  }

  const eliminaMezzo=(idutente)=>{
    console.log("EliminaMezzo dice: "+idutente)
    axios.post("http://localhost:5000/mezzi/eliminaMezzo",{targa:targhe[bottonecliccato]})
        .then((res)=>{            
            console.log("<Tabella")
            
        }).catch(err=>{
            console.log(err)
        })
  
    window.location.reload()
  }


  const modificaMezzo=(bottone)=>{
    console.log("Cliccato "+bottone)
    let riga=document.getElementById(bottone).parentNode.parentNode
    console.log(riga.id)
    window.sessionStorage.setItem("targaselezionata",targhe[riga.id])
    console.log(window.sessionStorage.getItem("targaselezionata"))
    window.location.href="/SchermataModificaMezzo"
  }

  useEffect(()=>{      
    axios.post("http://localhost:5000/mezzi/RecuperaDatiMezzi")
      .then((res)=>{
          console.log(res.data)
          listaMezzi(res.data)
      }).catch(err=>{
          console.log(err)
      })        
  })
  
  const listaMezzi=(datiTabella)=>{
    if(flag===false){
      var tabella=document.getElementById("tabellaMezzi")
      var tbody=tabella.tBodies[0]
      console.log(datiTabella.length)
      
      console.log(datiTabella[0]+" dati db")
      var tr, td0,button, td1, td2, td3, td4, td5, td6, td7, td8, td9, td10, td11, td12, td13,tdelimina,button2
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
          let modifica=function(){modificaMezzo(this.id);}
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
          td1.innerHTML=datiTabella[i].IdTipoMezzo
          td2=document.createElement("td")
          td2.innerHTML=datiTabella[i].TargaMatricola
          targhe[i]=datiTabella[i].TargaMatricola
          td3=document.createElement("td")
          td3.innerHTML=datiTabella[i].Modello
          td4=document.createElement("td")
          td4.innerHTML=datiTabella[i].Alimentazione
          td5=document.createElement("td")
          td5.innerHTML=datiTabella[i].Categoria
          td6=document.createElement("td")
          td6.innerHTML=datiTabella[i].Posti
          td7=document.createElement("td")
          if(datiTabella[i].CambioAutomatico===1){
            td7.innerHTML="Si"
          }          
          else{
            if(datiTabella[i].IdTipoMezzo==="Monopattino" || datiTabella[i].IdTipoMezzo==="Bicicletta"){
              td7.innerHTML="/"
            }
            else{
              td7.innerHTML="No"
            }
          }
          td8=document.createElement("td")
          td8.innerHTML=datiTabella[i].Optional          
          td10=document.createElement("td")
          td10.innerHTML=datiTabella[i].IdParcheggioStallo
          td11=document.createElement("td")
          td11.innerHTML=datiTabella[i].Tariffa
          td12=document.createElement("td")
          td12.innerHTML=datiTabella[i].TariffaSovrapprezzo
          td13=document.createElement("td")
          td13.innerHTML=datiTabella[i].Foto
          tr.appendChild(td0)
          tr.appendChild(tdelimina)
          tr.appendChild(td1)
          tr.appendChild(td2)
          tr.appendChild(td3)
          tr.appendChild(td4)
          tr.appendChild(td5)
          tr.appendChild(td6)
          tr.appendChild(td7)
          tr.appendChild(td8)
          tr.appendChild(td10)
          tr.appendChild(td11)
          tr.appendChild(td12)
          tr.appendChild(td13)
          tbody.appendChild(tr)
          console.log("Terminato "+ tbody)
          flag=true
        }
    }
  }

  return (
    <div style={{paddingTop:20, paddingLeft:30, paddingRight:40}}>
 
 <Table responsive striped bordered id="tabellaMezzi">
  <thead>
    <tr>
      <th>Modifica</th>
      <th>Elimina</th>
      <th>Tipo Mezzo</th> 
      <th>Targa</th>
      <th>Modello</th>
      <th>Alimentazione</th>
      <th>Categoria</th>
      <th>Numero posti</th>
      <th>Cambio Automatico</th>
      <th>Optional</th>
      <th>Stallo Parcheggio</th>
      <th>Tariffa ora</th>
      <th>Sovraprezzo</th>
      <th>Foto</th>     
    </tr>
  </thead>
  <tbody id="corpoTabellaMezzi">
    
  </tbody>
</Table>

  
        <PopupAttenzione
          show={show}
          onHide={() => setShow(false)}  
          onConfirm={()=>eliminaMezzo(bottonecliccato)}
          stringAttenzione={"Sei sicuro di voler eliminare questo mezzo? Questa operazione non è reversibile"}
        />
    
  </div>
  );
}




export default TabMezzi;