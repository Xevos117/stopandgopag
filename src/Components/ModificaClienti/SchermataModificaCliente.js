import FormGestioneCliente from "./ModificaCliente";

function SchermataModificaCliente(){
    return(
        <>
        <body style={{backgroundImage: `url(${"../images/sfondoSchermate.jpg"})`, height:1280, paddingTop:10}}>
        
        <FormGestioneCliente/>
          
        </body>  
        </>
    )
}

export default SchermataModificaCliente;