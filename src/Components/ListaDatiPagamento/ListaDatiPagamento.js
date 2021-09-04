import TabDatiPagamento from "./TabDatiPagamento";
import BottoneInserimento from "./BottoneInseriemento";

function ListaDatiPagamento(){
    return(
        <body >
        <h1 style={{paddingLeft:30, paddingTop:40, paddingBottom:5}}>Lista dati pagamento</h1>
        <TabDatiPagamento/>
        <BottoneInserimento/>
      
        </body>
    )
}

export default ListaDatiPagamento;