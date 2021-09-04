import TabMezzi from "./TabMezzi";
import BottoneInserimento from "./BottoneInseriemento";

function ListaMezzi(){
    return(
        <body >
        <h1 style={{paddingLeft:30, paddingTop:40, paddingBottom:5}}>Lista mezzi</h1>
        <TabMezzi/>
        <BottoneInserimento/>
      
        </body>
    )
}

export default ListaMezzi;