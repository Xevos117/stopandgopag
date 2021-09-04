import {useEffect} from "react"
import {Table, Pagination} from 'react-bootstrap';
require ('bootstrap')


function Tabella(props){
    let active = 1;
    let items = [];
   // console.log(items)

    function inizializzaIntestazioni(props){
        let thead=document.getElementById("rigaIntestazioni")
       // console.log(props)       
       // console.log(props.intestazioni.length)
        if(thead.childElementCount!==0){
          return
        }
        for(let i=0; i<props.intestazioni.length; i++){
            let th=document.createElement("th")
            if(i==2 && props.seleziona===true){
                th.innerHTML="Seleziona"                
                let th2=document.createElement("th")
                th2.innerHTML=props.intestazioni[i] 
                thead.appendChild(th)
                thead.appendChild(th2)
            }
            else{
            th.innerHTML=props.intestazioni[i]
            th.id=i+" Header"            
            thead.appendChild(th)           
            }           
        }
    }

    function calcoloNumeroPagine(lunghezzaArray){
       // console.log(lunghezzaArray/9)
       // console.log(items)
        for (let number = 1; number <= Math.ceil(lunghezzaArray/15); number++) {
       //     console.log("qui")
          items.push(
            <Pagination.Item key={number} id={"paginazione"+number} onClick={()=>click(props, {number})} active={number === active} >
              {number}        
            </Pagination.Item>,
          );
         // console.log(items)
        }  
        
      }
      calcoloNumeroPagine(props.righe.length)


      function click(props, event){
          
       // console.log(event.number)
       // console.log(items)
        let paginazione=document.getElementById("paginazione"+active).parentNode
        paginazione.className="page-item"
        active=event.number
        paginazione=document.getElementById("paginazione"+active).parentNode
        paginazione.className="page-item active"
       // console.log(items)
        let estremi=estremiArray(props.righe.length,active)
        let c=document.getElementById("corpoTabella")
        c.parentNode.removeChild(c)
        console.log(estremi)
        c=document.createElement("tbody")       
        c.id="corpoTabella"  
        document.getElementById("tabella").appendChild(c)
        inizializzaRighe(props,estremi[0],estremi[1])
        
      }

    function estremiArray(lunghezzaArray,paginaselezionata){
        //console.log(lunghezzaArray)
        let estremo1=(paginaselezionata-1)*15
        let estremo2=estremo1+14
        let ritorno=[]
        if(estremo2>lunghezzaArray){
          estremo2=lunghezzaArray-1
          ritorno=[estremo1, estremo2]
         // console.log(estremo1)
        //  console.log(estremo2) 
          return ritorno
        }
        else{
          ritorno=[estremo1, estremo2]
          //console.log(estremo1)
          //console.log(estremo2) 
          return ritorno
        }      
      }

    function inizializzaRighe(props,estremo1,estremo2){
      
        let tbody=document.getElementById("corpoTabella")
        if(tbody.childElementCount!==0){
          return
        }
        for(let i=estremo1;i<estremo2;i++){
          //console.log(props)
            let row=document.createElement("tr")
            row.id=i
            let button=document.createElement("button")
            let tdbottone=document.createElement("td")
            if(props.modificaelimina===true){
            button.type="button"
            button.id="Modifica"+i
            button.className="btn btn-primary"
            if(props.righe[i][5]===null && props.autistamode===true){
              button.innerHTML="Accetta" 
            }
            else{
              button.innerHTML="Modifica" 
            }
            button.addEventListener('click',()=>{props.modifica(button.id)},false)
            tdbottone.appendChild(button)
            row.appendChild(tdbottone)            
            let button2=document.createElement("button")
            button2.type="button"
            button2.id="Elimina"+i
            button2.className="btn btn-danger"
            if(props.righe[i][6]===1 && props.autistamode!==true){
              button.disabled=true
              button2.disabled=true
            }
            if(props.autistamode===true){
              button2.innerHTML="Rifiuta" 
              if(props.righe[i][5]!==null){
                button2.disabled=true
              }
            }
            else{
              button2.innerHTML="Elimina" 
            }
            button2.addEventListener('click',()=>{props.elimina(button2.id)},false)
            tdbottone=document.createElement("td")
            tdbottone.appendChild(button2)
            row.appendChild(tdbottone)
            }
            if(props.seleziona===true){
                let button3=document.createElement("button")
                button3.type="button"
                button3.id="Seleziona"+i
                button3.className="btn btn-success"
                button3.innerHTML="Seleziona" 
                button3.addEventListener('click',()=>{props.selezionafunction(button3.id)},false)
                tdbottone=document.createElement("td")
                tdbottone.appendChild(button3)
                row.appendChild(tdbottone)
            }     
            for(let j=0; j<6;j++){
                let td=document.createElement("td")
                if(props.righe[i][6]===0 && props.autistamode===true){
                  row.style.backgroundColor="#ffffb3"             
                }
                else if(props.righe[i][6]===1 && props.autistamode===true){
                  //CORSA ACCETTATA
                  row.style.backgroundColor="#99ff99"
                  button.innerHTML="Accetta"
                  button.disabled=true
                }

                if(props.clientemode===true && props.righe[i][6]===1 &&props.righe[i][7]===0){
                  //EVIDENZIA CORSA AVVIATA MA NON CONCLUSA
                  row.style.backgroundColor="#ffffb3"
                }
                if(props.clientemode===true && props.righe[i][7]===1){
                  //EVIDENZIA CORSA AVVIATA e CONCLUSA
                  row.style.backgroundColor="#99ff99"
                }
                td.innerHTML=props.righe[i][j]
                td.id="DatoTabella"+j+"riga"+i
                //console.log(props.righe[i][j])
                row.appendChild(td)
            }
            tbody.appendChild(row)
        }
    }
   
    useEffect(()=>{
        inizializzaIntestazioni(props)
        //console.log(props.righe.length)
        inizializzaRighe(props,0,props.righe.length)
      })


    return(
        <div className="table-responsive" style={{paddingTop:20, paddingLeft:30, paddingRight:40}}>
          d
    <Table responsive striped bordered id="tabella">
                <thead id="intestazioni">
                    <tr id="rigaIntestazioni">

                    </tr>
                </thead>
                <tbody id="corpoTabella">
                    
                </tbody>
            </Table>
            <div className="container"/*style={{maxWidth:500, paddingBottom:10, alignContent:'center', paddingTop:10}}*/>
          <table style={{margin:"30px auto 0px"}}>
          <Pagination id="paginazione" size="lg">
           {items}
          </Pagination>
          </table>        
        </div>
        </div>
    )
}

export default Tabella;