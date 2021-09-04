import {Row, Form, Button, Col, InputGroup, FormControl} from "react-bootstrap"
import {isValidElement, useState, setState} from 'react'
import $ from "jquery"
import Feedback from "react-bootstrap/esm/Feedback";
import axios from "axios";
import '../Generali/Generali/bordi.css'
const crypto=require('crypto')

function FormGestioneMezzo(){
    const [validated, setValidated] = useState(false);
    const [ form, setForm ] = useState({})
    const [ errors, setErrors ] = useState({})

    function inserisciDatiMezzo(event){
        event.preventDefault();
        var form = document.getElementById("form");
    
        if (form.checkValidity() === true){

            const mezzoReg ={
                tipologia: document.getElementById("tipoMezzo").value,
                targa:  document.getElementById("targa").value,
                modello:  document.getElementById("modello").value,
                alimentazione:  document.getElementById("alimentazione").value,
                colore:  document.getElementById("colore").value,
                numPosti:  document.getElementById("NumPosti").value,
                anno:  document.getElementById("anno").value,
                optional:  document.getElementById("optional").value,
                descrizioneMezzo:  document.getElementById("descrizioneMezzo").value,
                parc:  document.getElementById("parcheggio").value,
                tariffaOraria:  document.getElementById("tariffa").value,
                sovreprezzo:  document.getElementById("sovreprezzo").value,
                fotoMezzo:  document.getElementById("fotoMezzo").value

            };

            try{
                axios.post("/mezzi/inserisciMezzo", mezzoReg)
                .then((res)=>{
                    alert("MEZZO INSERITO");
                    window.location.href= "/SchermataPrincipaleAmministratore"
                }
                ).catch(err =>{
                    if(err.response.status===400){
                        alert("Mezzo già inserito");
                    }else{
                        alert("ERRORE");
                    }
                });
            }
            catch(err){
                console.log(err.response.data.msg);
            }
            }
        }
    



    return(
    
        <div className="container-fluid" style={{maxWidth:500, paddingBottom:10, alignContent:'center', paddingTop:10,backgroundColor:"#d6d6f5"}}>
            <div className="TitoloForm" style={{backgroundColor:"blue", textAlign:"center", color:"white", borderRadius:10}}>
            <h2>Modifica mezzommmmmmmmmmm</h2>
            </div>
            <Form noValidate validated={validated} onSubmit={inserisciDatiMezzo}>
    <Row className="mb-3">

    <Form.Group as={Col} controlId="tipoMezzo" >
        <Form.Label><strong>Tipologia mezzo</strong></Form.Label>
        <select className="form-select mb3" id="inputGroupSelect01">
        <option selected="selected" value="">Mezzo</option>
        <option value="Id1">Auto</option>
        <option value="Id2">Moto</option>
        <option value="Id3">Bicicletta</option>
        <option value="Id4">Monopattino</option>
        </select>    
            
      </Form.Group>

        <Form.Group as={Col} controlId="targa">
        <Form.Label><strong>Targa</strong></Form.Label>
        <Form.Control type="text" placeholder="Inserisci la targa"/>
        </Form.Group>
    </Row>

    <Row className="mb-3">
        <Form.Group as={Col} controlId="modello">
        <Form.Label><strong>Modello</strong></Form.Label>
        <Form.Control type="text" placeholder="Inserisci modello" />
        </Form.Group>

        <Form.Group as={Col} controlId="alimentazione">
        <Form.Label><strong>Alimentazione</strong></Form.Label>
        <Form.Control type="text" placeholder="Inserisci alimentazione" />
        </Form.Group>

        
    </Row>

    <Row className="mb-3">
    <Form.Group as={Col} controlId="colore">
        <Form.Label><strong>Colore</strong></Form.Label>
        <Form.Control type="text" placeholder="Inserisci colore" />
        </Form.Group>
       

        <Form.Group as={Col} controlId="NumPosti">
        <Form.Label><strong>Numero posti</strong></Form.Label>
        <Form.Control type="number" placeholder="Inserisci numero posti" />
        </Form.Group>
  
    </Row>


    

    <Row className="mb-3">
    
    <Form.Group as={Col} controlId="anno">
        <Form.Label><strong>Anno</strong></Form.Label>
        <Form.Control type="number" placeholder="Inserisci anno" required/>
        </Form.Group>

        <Form.Group as={Col} controlId="optional">
        <Form.Label><strong>Optional</strong></Form.Label>
        <Form.Control type="text" placeholder="Inserisci optional" />
        </Form.Group>
    
    </Row>

    <Row className="mb-3">
    <label for="exampleFormControlTextarea1"><strong>Descrizione mezzo</strong></label>
    <textarea class="form-control" id="descrizioneMezzo" rows="3"></textarea>

    </Row>

    <Row className="mb-3">

    <Form.Group as={Col} controlId="parcheggio" >
        <Form.Label><strong>Stallo/Parcheggio</strong></Form.Label>
        <select className="form-select mb3" id="inputGroupSelect01">
        <option selected="selected" value="">Stallo/Parcheggio</option>
        <option value="Id1">Parc1</option>
        <option value="Id2">stal1</option>
        <option value="Id3">parc2</option>
        <option value="Id4">stal2</option>
        </select>    
            
      </Form.Group>

    </Row>
    <Row className="mb-3">

    <Form.Group as={Col} controlId="tariffa">
        <Form.Label><strong>Tariffa oraria</strong></Form.Label>
        <Form.Control type="number"  placeholder="Inserisci la tariffa oraria" required/>
    </Form.Group>

    <Form.Group as={Col} controlId="sovrapprezzo">
        <Form.Label><strong>Sovrapprezzo</strong></Form.Label>
        <Form.Control type="number"  placeholder="Inserisci sovrapprezzo" required/>
    </Form.Group>

    </Row>
    <Row className="mb-3">

    <Form.Group controlId="fotoMezzo" className="mb-3">
            <Form.Label><strong>Inserire allegato foto mezzo</strong></Form.Label>
            <Form.Control type="file" size="sm" />
        </Form.Group>

    </Row>

    <Button variant="primary" type="submit">
        Modifica
    </Button>
        <text>     </text>
    <Button variant="primary" type="submit">
        Elimina
    </Button>
    </Form>
    </div>

    )
}

export default FormGestioneMezzo;