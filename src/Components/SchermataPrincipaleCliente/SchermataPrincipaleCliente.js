import FormRicerca from '../SchermataPrincipale/FormRicerca'

function SchermataPrincipaleCliente(){
    if(window.sessionStorage.getItem("utente")){
    return(
        <body  style={{backgroundImage: `url(${"../images/sfondoSchermate.jpg"})`}}>        
        <FormRicerca/>              
        </body>
    )
    }
    else{
        window.location.href="/Login"
    }
}

export default SchermataPrincipaleCliente;