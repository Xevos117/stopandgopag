import {Form, Button} from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Generali/Generali/bordi.css'
import {useState} from "react"
import PopupErrore from "../Generali/Generali/PopupErrore"
const axios= require('axios')
const crypto=require('crypto')
let errore

function FormLogin(){
    const [show, setShow] = useState(false);  //per mostrare o nascondere il popup

    function login(){
        let crypass= crypto.createHash('sha512');
        crypass.update(document.getElementById("formBasicPassword").value); // criptiamo la password
        let passEsa=crypass.digest('hex');
        const utentelogin={
            email:document.getElementById("formBasicEmail").value,
            password:passEsa
        }
        console.log(utentelogin)
        axios.post("https://3.130.208.226:5000/utente/utenteLogin",utentelogin,{withCredentials:true})
        .then((res)=>{
            console.log(res.data.Ruolo)
            window.sessionStorage.setItem("utente", JSON.stringify(res.data));
            //let c=(res.headers.cookie).split("=")[1];
            if(res.data.Ruolo==='Cliente'){
                window.location.href="/SchermataPrincipaleCliente"
            }
            else if(res.data.Ruolo==='Amministratore'){
                window.location.href="/SchermataPrincipaleAmministratore"
            }
            else if(res.data.Ruolo==='Autista'){
                window.location.href="/SchermataPrincipaleAutista"
            }
            else if(res.data.Ruolo==='GestoreParcheggio'){
                window.location.href="/SchermataPrincipaleGestoreParcheggio"
            }
            else{
                errore="Errore accesso imprevisto"
                setShow(true)
            }
            
        }).catch(err=>{
            console.log(err)
            if(err.response.status===404){
                errore="Email errata"
                setShow(true)
            }
            else if(err.response.status===400){
                errore="Password errata"
                setShow(true)
            }
            else{
                errore="Errore generico"
            }
        }).catch(err=>{
            console.log(err.response.data.msg)
        })
    }

    return(
        <div style={{height:800, paddingTop:100}}>
        <div className="container-fluid" style={{maxWidth:400, alignContent:'center', paddingTop:10, paddingBottom:10,backgroundColor:"#d6d6f5"}}>
            <div className="TitoloForm" style={{backgroundColor:"blue", textAlign:"center", color:"white", borderRadius:10}}>
            <h2>Accedi</h2>
            </div>
        <div class="container" style={{maxWidth:400, paddingTop:20}}>
        <Form>
    <Form.Group className="mb-3" controlId="formBasicEmail" >
        <Form.Label><strong>Indirizzo Email</strong></Form.Label>
        <Form.Control type="email" placeholder="Inserisci email" required/>
        <Form.Text className="text-muted">
        </Form.Text>
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label><strong>Password</strong></Form.Label>
        <Form.Control type="password" placeholder="Password" required/>
    </Form.Group>    
    <Button variant="primary" onClick={login}>
        Accedi
    </Button>
    <p>Se non sei ancora registrato<text> </text>
    <a href="/SchermataDiRegistrazione">Registrati</a></p>
    </Form>
    
    </div>
    </div>
    <PopupErrore
            show={show}
            errore={errore}
            onHide={()=>setShow(false)}
        />
    </div>
    )
}

export default FormLogin;