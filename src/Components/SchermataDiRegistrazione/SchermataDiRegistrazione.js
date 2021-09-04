import FormRegistrazione from "./FormRegistrazione";

function SchermataDiRegistrazione(){
    return(
        <>
        <body style={{backgroundImage: `url(${"../images/sfondoSchermate.jpg"})`, height:1280, paddingTop:10}}>
        
        <FormRegistrazione/>
          
        </body>  
        </>
    )
}

export default SchermataDiRegistrazione;