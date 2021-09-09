import { useEffect, useState } from "react"
import Offcanvas from 'react-bootstrap/Offcanvas'
import {Button, Form, Col, Row, Pagination} from "react-bootstrap"
import PopupErrore from "../Generali/Generali/PopupErrore"
const axios=require('axios')
let flag=false
require('bootstrap')


function SchermataRisultati(){
let macchine
let flag2=false
let active = 1;
let items = [];
let specificheprenotazione=[]

function click(event){
  console.log(event.number)
  console.log(items)
  let paginazione=document.getElementById("paginazione"+active).parentNode
  paginazione.className="page-item"
  active=event.number
  paginazione=document.getElementById("paginazione"+active).parentNode
  paginazione.className="page-item active"
  console.log(items)
  let estremi=estremiArray(macchine.length,active)
  let c=document.getElementById("cardbody")
  c.parentNode.removeChild(c)
  console.log(estremi)
  c=document.createElement("div")
  c.className="container"
  c.id="cardbody"  
  document.getElementById("card").appendChild(c)
  flag=false
  createCard(macchine,estremi[0],estremi[1])
}

function calcoloNumeroPagine(lunghezzaArray){
  
  for (let number = 1; number <= Math.ceil(lunghezzaArray/9); number++) {
    items.push(
      <Pagination.Item key={number} id={"paginazione"+number} onClick={()=>click({number})} active={number === active} >
        {number}        
      </Pagination.Item>,
    );
  }  
}

  const [show, setShow] = useState(false);
  const [showerrore, setShowErrore]=useState(false)//POPUP ERRORE RICERCA
  const [showerrore2, setShowErrore2]=useState(false)//POPUP ESEGUI ACCESSO
  const [errore, setErrore]=useState()
  const handleClose = () => setShow(false);

    function precompilaform(){
      
      let datiprenotazione=JSON.parse(window.sessionStorage.getItem("datiprenotazione"))
      document.getElementById("formGridDataInizio").value=datiprenotazione.dataOraInizio.substr(0,10)
      document.getElementById("formGridDataFine").value=datiprenotazione.dataOraFine.substr(0,10)
      document.getElementById("formGridOraFine").value=datiprenotazione.dataOraFine.substr(11,16)
      document.getElementById("formGridOraInizio").value=datiprenotazione.dataOraInizio.substr(11,16)
      document.getElementById("ruolo").value=datiprenotazione.tipologiaMezzo
      document.getElementById("autista").checked=datiprenotazione.autista
    }

    

     function precompilafiltri(){
      let datiprenotazione=JSON.parse(window.sessionStorage.getItem("datiprenotazione"))
      
      if(datiprenotazione.categoria!=='%'){
        document.getElementById("filtrocategoria").value=datiprenotazione.categoria
      }
      if(datiprenotazione.passeggeri!=='%'){
        document.getElementById("filtropasseggeri").value=datiprenotazione.passeggeri
      }

      if(datiprenotazione.cambio!=='%'){
        console.log(datiprenotazione.cambio)
        document.getElementById("cambio").value="1"

        if(datiprenotazione.cambio==="0"){
          document.getElementById("cambio").value="0"
        }
        else{
          document.getElementById("cambio").value="1"
        }
      }
    
    }

    function estremiArray(lunghezzaArray,paginaselezionata){
      console.log(lunghezzaArray)
      console.log("estremiarray")
      let estremo1=(paginaselezionata-1)*9
      let estremo2=estremo1+8
      let ritorno=[]
      if(estremo2>lunghezzaArray){
        estremo2=lunghezzaArray-1
        ritorno=[estremo1, estremo2]
        console.log(estremo1)
        console.log(estremo2) 
        return ritorno
      }
      else{
        ritorno=[estremo1, estremo2]
        console.log(estremo1)
        console.log(estremo2) 
        return ritorno
      }      
    }

    function settaFreccia(){
      let state=document.getElementById("mostraform").ariaExpanded
      console.log(state)
      console.log(typeof(true))
      if(state==="false"){
        console.log("entro nel true")
        document.getElementById("freccia").style="transform: rotate(0deg)"
      }
      else{
        console.log("entro nel false")
        document.getElementById("freccia").style="transform: rotate(180deg)"
      }
    }

    function prenotazione(id){
      if(!JSON.parse(window.sessionStorage.getItem("utente"))){
        setShowErrore2(true)
        return
      }
      let datiprenotazione=JSON.parse(window.sessionStorage.getItem("datiprenotazione"))

      if((datiprenotazione.tipologiaMezzo==="Auto" && datiprenotazione.autista===false) || datiprenotazione.tipologiaMezzo==="Moto"){
        axios.post("http://localhost:5000/utente/richiedinumeropatente",{id:JSON.parse(window.sessionStorage.getItem("utente")).IdUserid})
        .then((res)=>{
          console.log(res.data[0].Patente)
          if(res.data[0].Patente===null || res.data[0].Patente===""){
            setErrore("Nessuna patente inserita. Si può comunque noleggiare un auto richiedendo un autista, altrimenti provvedere ad inserirne una nella schermata dati personali")
            setShowErrore(true)
            return
          }
          else{
            let divid=document.getElementById(id).parentNode.parentNode.parentNode.parentNode.id
            specificheprenotazione[0]=JSON.parse(window.sessionStorage.getItem("datiprenotazione"))
            specificheprenotazione[1]=macchine[divid]
            window.sessionStorage.setItem("specificheprenotazione",JSON.stringify(specificheprenotazione))
            window.location.href="/SchermataPrenotazione"
          }
          
        })
      }
      else{
        let divid=document.getElementById(id).parentNode.parentNode.parentNode.parentNode.id
        specificheprenotazione[0]=JSON.parse(window.sessionStorage.getItem("datiprenotazione"))
        specificheprenotazione[1]=macchine[divid]
        window.sessionStorage.setItem("specificheprenotazione",JSON.stringify(specificheprenotazione))
        window.location.href="/SchermataPrenotazione"
      }
      console.log("Qui")

      
    }


    function createCard(macchine, estremo1, estremo2){
      console.log(estremo1)
      console.log(estremo2)
      console.log(macchine[0])
      console.log(flag2)
      if(macchine.length===0){
        setErrore("Nessun risultato trovato. Cambiare parametri di ricerca")
        setShowErrore(true)
        return
      }
        if(flag===false){
            console.log("createcard")
            let div,divcard,divprenota, img, cardbody, h5, p, ul, l1,l2,l3, cardbody2, countRighe, row, col, collapse, menutendina, prenota
            countRighe=0
            div=document.getElementById("cardbody")
            row=document.createElement("row")
            row.className="mb-3 row"
            div.appendChild(row)

            for(let i=estremo1; i<estremo2;i++){
              console.log(i)
              if(countRighe===3){
                row=document.createElement("row")
                row.className="mb-3 row"
                div.appendChild(row)
                countRighe=0
              }
              col=document.createElement("col")
              col.className="col"
              col.id="colonna"
              divcard=document.createElement("div")
              divcard.className="card"
              divcard.style="width:18rem, color-background:grey"
              divcard.id=i              
              img=document.createElement("img")
              if(macchine[i].Modello==="Opel Crossland X"){
                img.src="../images/opelCrossland.png"
              }
              else if(macchine[i].Modello==="Fiat Panda"){
                img.src="../images/fiatPanda.png"
              }
              else if(macchine[i].Modello==="Opel Corsa"){
                img.src="../images/opelCorsa.png"
              }
              else if(macchine[i].IdTipoMezzo==="Moto"){
                img.src="../images/moto.png"
              }
              else if(macchine[i].IdTipoMezzo==="Monopattino"){
                img.src="../images/monopattino.png"
              }
              else if(macchine[i].IdTipoMezzo==="Bicicletta"){
                img.src="../images/bicicletta.png"
              }
              else{
                img.src="../images/volkswagenPolo.png"
              }

              img.className="card-img-top"
              cardbody=document.createElement("div")
              cardbody.className="card-body"
              h5=document.createElement("h5")
              h5.className="card-title"
              h5.innerHTML=macchine[i].Modello
              p=document.createElement("p")
              p.className="card-text"
              p.innerHTML="<strong>Tariffa oraria: </strong>"+macchine[i].Tariffa+" €"
              ul=document.createElement("ul")
              ul.className="list-group list-group-flush"
              ul.id="lista"
              l1=document.createElement("li")
              l1.innerHTML="<strong>Alimentazione:</strong> "+macchine[i].Alimentazione
              l1.className="list-group-item"
              l2=document.createElement("li")
              l2.className="list-group-item"
              collapse=document.createElement("div")
              collapse.className="collapse"
              collapse.id="menuoptional"+i
              let ul2=document.createElement("ul")
              ul2.className="list-group list-group-flush"
              ul2.id="listadettagli"
              let l3 =document.createElement("li")
              if(macchine[i].CambioAutomatico===1)
              l3.innerHTML="<strong>Tipo cambio: </strong>"+"Automatico"
              else{
                l3.innerHTML="<strong>Tipo cambio: </strong>"+"Manuale"
              }
              ul2.appendChild(l3)
              collapse.appendChild(ul2)
              menutendina=document.createElement("a")
              menutendina.role="button"
              menutendina.id="menu"+i
              menutendina.type="button"
              menutendina.innerHTML="Mostra dettagli"
              menutendina.className="btn btn-outline-primary btn-sm"
              menutendina.setAttribute("data-bs-toggle","collapse")
              menutendina.setAttribute("aria-expanded",false)
              menutendina.setAttribute("aria-controls","menuoptional"+i)
              menutendina.href="#menuoptional"+i         
              l2.appendChild(menutendina)
              l2.appendChild(collapse)
              l3=document.createElement("li")
              l3.className="list-group-item"   
              divprenota=document.createElement("div")
              divprenota.className="d-grid gap-2" 
              divprenota.id="prenota"          
              let funzione=function(){prenotazione(this.id)}
              prenota=document.createElement("button")
              prenota.type="button"
              prenota.id="Prenota"+i
              prenota.className="btn btn-success"
              prenota.innerHTML="Prenota"
              prenota.addEventListener('click',funzione,false)
              divprenota.appendChild(prenota)
              l3.appendChild(divprenota)
              cardbody2=document.createElement("div")
              cardbody.appendChild(h5)
              cardbody.appendChild(p)
              ul.appendChild(l1)
              ul.appendChild(l2)
              ul.appendChild(l3)
              divcard.appendChild(img)
              divcard.appendChild(cardbody)
              divcard.appendChild(ul)
              divcard.appendChild(cardbody2) 
                         
              row.appendChild(col)
              if(i===macchine.length && macchine.length%3===1){
                console.log("ciao")
                row.appendChild(col)
                row.appendChild(col)
              }
              else if(i===macchine.lenght-1 && macchine.length%3===2){
                console.log("ciao2")
                row.appendChild(col)
              }
              col.appendChild(divcard)
              countRighe++
          }
          flag=true
        }
    }

    

    function abilitaAutista(){
        console.log("Cambiato")
        let valore=document.getElementById("ruolo").value
        if(valore!=='Auto'){
            document.getElementById("autista").disabled=true
        }
        else{
            document.getElementById("autista").disabled=false
        }
    }

    function applicaFiltri(){
      console.log("ciao")
      const datiPrenotazione={
          dataOraInizio:document.getElementById("formGridDataInizio").value+"T"+document.getElementById("formGridOraInizio").value,
          dataOraFine:document.getElementById("formGridDataFine").value+"T"+document.getElementById("formGridOraFine").value,
          tipologiaMezzo:document.getElementById("ruolo").value,
          autista:document.getElementById("autista").checked,
          categoria:document.getElementById("filtrocategoria").value,
          passeggeri:document.getElementById("filtropasseggeri").value,
          cambio:document.getElementById("cambio").value,
      }
      console.log(datiPrenotazione)
      let datiprenotazione=JSON.stringify(datiPrenotazione)
      window.sessionStorage.setItem("datiprenotazione",datiprenotazione)     
      window.location.reload()
  }

  function handleSubmit(){
    
    let datiPrenotazione={
        idCliente:JSON.parse(window.sessionStorage.getItem("datiprenotazione")).idCliente,
        dataOraInizio:document.getElementById("formGridDataInizio").value+"T"+document.getElementById("formGridOraInizio").value,
        dataOraFine:document.getElementById("formGridDataFine").value+"T"+document.getElementById("formGridOraFine").value,
        tipologiaMezzo:document.getElementById("ruolo").value,
        autista:document.getElementById("autista").checked,
        categoria:"%",
        passeggeri:"%",
        cambio:"%",
    }


    if(JSON.parse(window.sessionStorage.getItem("utente"))){
      if(JSON.parse(window.sessionStorage.getItem("utente")).Ruolo==="Cliente"){
        datiPrenotazione.idCliente=JSON.parse(window.sessionStorage.getItem("utente")).IdUserid
      }
    }

    console.log(datiPrenotazione)
    let datiprenotazione=JSON.stringify(datiPrenotazione)
    window.sessionStorage.setItem("datiprenotazione",datiprenotazione)    
    window.location.href="/SchermataRisultati"
}

    useEffect(()=>{
      let datiPrenotazione=JSON.parse(window.sessionStorage.getItem("datiprenotazione"))
      axios.post("http://localhost:5000/prenotazioni/ricercaMezzo",datiPrenotazione)
            .then((res)=>{
                console.log(res.data)
                macchine=res.data  
                console.log(macchine)          
                window.sessionStorage.setItem("macchine",JSON.stringify(macchine))    
                calcoloNumeroPagine(res.data.length)          
                createCard(res.data,0,res.data.length)  
                macchine=res.data                 
                //console.log(macchine)
              })
            .catch((err)=>{
                console.log(err)
            })
        precompilaform()
        macchine=JSON.parse(window.sessionStorage.getItem("macchine"))
        settaFreccia()
        console.log(macchine)
    },[])

    

    return(
        <>
        
        <div id="corpo" style={{backgroundColor:" #e6e6e6", minHeight:1200}}>
        <div className="container-fluid collapse" id="collapseExample" style={{paddingBottom:10, alignContent:'center',backgroundColor:"#d6d6f5", borderRadius:0}}>                  
      <Form>                   
      <Row className="mb-3">
      <Col style={{maxWidth:150, marginTop:50}}>
        <Button variant="primary" onClick={()=>{setShow(true)}} style={{marginTop:10}}>
        Mostra filtri
      </Button>
        </Col>
          <Col>
        <Form.Group as={Col} controlId="formGridDataInizio" >
        <Form.Label><strong>Data Inizio</strong></Form.Label>
        <Form.Control type="date" required/>       
        </Form.Group>
    
        <Form.Group as={Col} controlId="formGridOraInizio">
        <Form.Label><strong>Ora inizio</strong></Form.Label>
        <Form.Control type="time" required/>
        </Form.Group> 
        </Col>       
    
        <Col>
        <Form.Group as={Col} controlId="formGridDataFine" >
        <Form.Label><strong>Data fine</strong></Form.Label>
        <Form.Control type="date" required/>       
        </Form.Group>

    
        <Form.Group as={Col} controlId="formGridOraFine">
        <Form.Label><strong>Ora fine</strong></Form.Label>
        <Form.Control type="time" required/>
        </Form.Group>
        </Col>
        <Col>
        <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridTipoMezzo" onChange={abilitaAutista}>
        <Form.Label ><strong>Tipologia mezzo</strong></Form.Label>
        <select className="form-select mb3" id="ruolo">
        <option selected="selected" value=""></option>
        <option value="Auto">Auto</option>
        <option value="Moto">Moto</option>
        <option value="Bicicletta">Bicicletta</option>
        <option value="Monopattino">Monopattino</option>
        </select>
        </Form.Group>
  
    </Row>
    <Row>
    <Col>
      <Form.Check     
             
          label="Autista"
          id="autista"
          style={{marginTop:33}}
        />
      </Col>
      <Col>
      <Button variant="primary" style={{marginTop:10, marginLeft:30}} onClick={handleSubmit} size="lg">
        Ricerca
      </Button>
      </Col>
    </Row>
      
        
        </Col>
        
    </Row>
        
      </Form>
      
        </div>  
        <div className="container d-grid gap-2 col-1 mx-auto" style={{alignContent:'center', maxWidth:30}}>
        <a  id="mostraform" onClick={settaFreccia} data-bs-toggle="collapse" href="#collapseExample" style={{backgroundColor:"#d6d6f5", boxShadow:"", }} role="button" aria-expanded="false" aria-controls="collapseExample">
        <svg xmlns="http://www.w3.org/2000/svg" id="freccia" width="30" height="30" fill="currentColor" class="bi bi-arrow-down-short" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M8 4a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5A.5.5 0 0 1 8 4z"/>
        </svg>
        </a>
        </div>
   

      <Offcanvas show={show} onHide={handleClose} onEntered={precompilafiltri} backdrop={false} style={{backgroundColor:"#d6d6f5", boxShadow:"10px 12px 14px 4px"}}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filtri</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form>
            

            <Form.Group>
              <Form.Label><strong>Categoria</strong></Form.Label>
              <Form.Select aria-label="Categoria" id="filtrocategoria">
              <option value="Media">Media</option>
              <option value="Piccola">Piccola</option>
              <option value="Grande">Grande</option>
              <option value="%" selected>Nessun Filtro</option>
             </Form.Select>
            </Form.Group>

          <Form.Group>
              <Form.Label><strong>Passeggeri</strong></Form.Label>
              <Form.Select aria-label="Passeggeri" id="filtropasseggeri">
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="%" selected>Nessun Filtro</option>
             </Form.Select>
            </Form.Group>
          
            <Form.Group>
              <Form.Label><strong>Cambio</strong></Form.Label>
              <Form.Select aria-label="cambio" id="cambio">
              <option value="0">Manuale</option>
              <option value="1">Automatico</option>
              <option value="%" selected>Nessun Filtro</option>
             </Form.Select>
            </Form.Group>
            <Button variant="primary" style={{marginTop:20}} onClick={()=>applicaFiltri()} size="lg">
              Applica Filtri
            </Button>
          </Form>
        
        </Offcanvas.Body>
      </Offcanvas>
        <div className="container" id="card" >
          <div className="container" id="cardbody">

          </div>                     
        </div>

        <div className="container"/*style={{maxWidth:500, paddingBottom:10, alignContent:'center', paddingTop:10}}*/>
          <table style={{margin:"30px auto 0px"}}>
          <Pagination id="paginazione" size="lg">
          {items}
        </Pagination>
          </table>
        
        </div>
        <PopupErrore
            show={showerrore}
            errore={errore}
            onHide={()=>{setShowErrore(false)}}
        />
        <PopupErrore
            show={showerrore2}
            errore={"Esegui l'accesso prima di continuare"}
            onHide={()=>{setShowErrore2(false); window.location.href="/Login"}}
        />
      </div>

        </>
    )
}

export default SchermataRisultati