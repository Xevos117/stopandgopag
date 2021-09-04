import FormRegistrazioneMezzo from "./FormGestioneMezzo";

function SchermataGestioneMezzo(){
    return(
        <>
        <body style={{backgroundImage: `url(${"../images/sfondoSchermate.jpg"})`, height:1000, paddingTop:40}}>
           
        <FormRegistrazioneMezzo/>
        </body>
        </>
        )
}

export default SchermataGestioneMezzo;