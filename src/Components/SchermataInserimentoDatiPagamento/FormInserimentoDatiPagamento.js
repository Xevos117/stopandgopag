import {Row, Form, Button, Col} from "react-bootstrap"
import {useState} from 'react'
//import $ from "jquery"
import axios from "axios";
import '../Generali/Generali/bordi.css'
import PopupSuccesso from "../Generali/Generali/PopupSuccesso";
function ModificaDatoPagamento(props){

    const [validated, setValidated] = useState(false);
    const [ form, setForm ] = useState({})
    const [ errors, setErrors ] = useState({})
    const [show, setShow] = useState(false);

    const setField = (field, value) => {
      setForm({
        ...form,
        [field]: value
      })
    }
       
    function inserisciDatoPagamento(event){
        event.preventDefault();
        setValidated(true)
        var form = document.getElementById("form");
        if(form.checkValidity()==true){

        let idUtente = (JSON.parse(window.sessionStorage.getItem("utente"))).IdUserid;
       // let arrayDatiPag =[...props.utenteListaDatiPagamento]; //crea array con lista dati pagamento
            
        const datiPagamento ={
            id: idUtente,
            nomeInt:document.getElementById("formGridNomeInt").value,
            cognomeInt:document.getElementById("formGridCognomeInt").value,
            cartaCredito: document.getElementById("formGridCarta").value,
            meseScad: document.getElementById("meseScad").value,
            annoScad: document.getElementById("annoScad").value,
            cvv: document.getElementById("formGridCVV").value
        };
        console.log(datiPagamento)
        //arrayDatiPag.push(datiPagamento); //aggiunge nuovi dati pagamento in coda ad array
        //props.setDatiPagamento(arrayDatiPag);//????

        try{
            axios.post("http://localhost:5000/utente/aggiungiDatoPagamento", datiPagamento)
            .then((res)=>{
                console.log(res)
                setShow(true)
            });
        } catch(err){
            alert("ERRORE")
        }
    }
}

    

    return(
        <div style={{height:800, paddingTop:100}}>
        
        <center>
    <div className="container-fluid" style={{maxWidth:500, paddingBottom:10, alignContent:'center', paddingTop:10,backgroundColor:"#d6d6f5"}}>
            <div className="TitoloForm" style={{backgroundColor:"blue", textAlign:"center", color:"white", borderRadius:10}}>
            <h2>Inserisci il tuo dato di pagamento</h2>
            </div>
            <Form  noValidate validated={validated} onSubmit={inserisciDatoPagamento} id="form">

            <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridNomeInt" >
                <Form.Label><strong>Nome intestatario</strong></Form.Label>
                <Form.Control type="text" placeholder=""  required/>        
                </Form.Group>

                <Form.Group as={Col} controlId="formGridCognomeInt" >
                <Form.Label><strong>Cognome intestatario</strong></Form.Label>
                <Form.Control type="text" placeholder="" required/>        
                </Form.Group>
                
            </Row>

            <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridCarta" >
                <Form.Label><strong>Carta di credito</strong></Form.Label>
                <Form.Control type="text" placeholder="Inserisci la tua carta" pattern="[0-9]{12,16}" required/>
                <Form.Control.Feedback type="invalid">E' necessario inserire un numero valido da 12 a 16 cifre</Form.Control.Feedback>       
                </Form.Group>
                
            </Row>
    <Row className="mb-3">       

        <Form.Group as={Col} >
        <Form.Label ><strong>Mese scadenza</strong></Form.Label>
        <select className="form-select mb3" id="meseScad" required>
        <option selected="selected" value="" >MM</option>
        <option value="01">01</option>
        <option value="02">02</option>
        <option value="03">03</option>
        <option value="04">04</option>
        <option value="05">05</option>
        <option value="06">06</option>
        <option value="07">07</option>
        <option value="08">08</option>
        <option value="09">09</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option>
        </select>     
  
      </Form.Group>

      
      <Form.Group as={Col} controlId="annoScad" >
        <Form.Label><strong>Anno scadenza</strong></Form.Label>
        <select className="form-select mb3" id="annoScad" required>
        <option selected="selected" value="">AAAA</option>
        <option value="2021">2021</option>
        <option value="2022">2022</option>
        <option value="2023">2023</option>
        <option value="2024">2024</option>
        <option value="2025">2025</option>
        <option value="2026">2026</option>
        <option value="2027">2027</option>
        <option value="2028">2028</option>
        <option value="2029">2029</option>
        <option value="2030">2030</option>
        <option value="2031">2031</option>
        <option value="2032">2032</option>
        <option value="2033">2033</option>
        <option value="2034">2034</option>
        <option value="2035">2035</option>
        <option value="2036">2036</option>
        <option value="2037">2037</option>
        <option value="2038">2038</option>
        <option value="2039">2039</option>
        <option value="2040">2040</option>
        </select>    
            
      </Form.Group>

      <Form.Group as={Col} controlId="formGridCVV" >
        <Form.Label><strong>CVV</strong></Form.Label>
        <Form.Control type="text" placeholder="Inserisci il CVV" pattern="[0-9]{3,4}" required/>  
        <Form.Control.Feedback type="invalid">E' necessario inserire un cvv valido di 3 o 4 cifre</Form.Control.Feedback>       
        </Form.Group>

    </Row>

   

    <Button variant="primary" type="submit">
        Registra carta
    </Button>
    </Form>
    </div>
</center>

        <PopupSuccesso
        show={show}
        onHide={() => {setShow(false); window.location.href="/ListaDatiPagamento"}}  
        onConfirm={()=>{setShow(false); window.location.href="/ListaDatiPagamento"}}
        titolo={"Operazione completata"}
        stringAttenzione={"Registrazione effettuata correttamente"}
    />
</div>
    )
}


export default ModificaDatoPagamento;