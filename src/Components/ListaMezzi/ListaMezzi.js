import TabMezzi from "./TabMezzi";
import BottoneInserimento from "./BottoneInseriemento";

function ListaMezzi(){
    if(JSON.parse(window.sessionStorage.getItem("utente"))){
        if(JSON.parse(window.sessionStorage.getItem("utente")).Ruolo==="Cliente"){
            window.location.href="/"
        }        
        else if(JSON.parse(window.sessionStorage.getItem("utente")).Ruolo==="Autista"){
            window.location.href="/SchermataPrincipaleAutista"
        }
        else if(JSON.parse(window.sessionStorage.getItem("utente")).Ruolo==="GestoreParcheggio"){
            window.location.href="/SchermataPrincipaleGestoreParcheggio"
        }
    }
    else{
        window.location.href="/Login"
    }
    
    return(
        <body >
        <h1 style={{paddingLeft:30, paddingTop:40, paddingBottom:5}}>Lista mezzi</h1>
        <TabMezzi/>
        <BottoneInserimento/>
      
        </body>
    )
}

export default ListaMezzi;