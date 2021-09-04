import FormRegistrazioneCliente from "./FormRegistrazioneCliente";

function SchermataRegistrazioneCliente(){
    return(
        <>
        <body style={{backgroundImage: `url(${"../images/sfondoSchermate.jpg"})`, height:1280, paddingTop:10}}>
        
        <FormRegistrazioneCliente/>
          
        </body>  
        </>
    )
}

export default SchermataRegistrazioneCliente;