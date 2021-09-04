import TabClienti from "./TabClienti";
import BottoneInserimento from "./BottoneInseriemento";

function ListaClienti(){
    return(
        <body >
        <h1 style={{paddingLeft:30, paddingTop:40, paddingBottom:5}}>Lista clienti</h1>
        <TabClienti/>
        <BottoneInserimento/>
      
        </body>
    )
}

export default ListaClienti;