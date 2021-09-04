import TabDipendenti from "./TabDipendenti";
import BottoneInserimento from "./BottoneInseriemento";

function ListaDipendenti(){
    return(
        <body >
        <h1 style={{paddingLeft:30, paddingTop:40, paddingBottom:5}}>Lista dipendenti</h1>
        <TabDipendenti/>
        <BottoneInserimento/>
      
        </body>
    )
}

export default ListaDipendenti;