import NavbarLoggato from "./NavbarLoggato"
import NavbarAmministratore from "./NavbarAmministratore"
import Navbar from "./Navbar"
import NavbarAutista from "./NavbarAutista"
function Nav(){
    let utente=JSON.parse(window.sessionStorage.getItem("utente"))
    if(utente===null){
        console.log("navbar non loggato")
        return(
            <Navbar/>
        )
    }
    else if(utente.Ruolo==="Amministratore"){
        console.log("navbar Amministratore")
        return(
            <NavbarAmministratore/>
        )
    }
    else if(utente.Ruolo==="Cliente"){
        console.log("Cliente")
        return(
            <NavbarLoggato/>
        )
    }
    else{
        return(
            <NavbarAutista/>
        )
    }
}

export default Nav