import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Components/Generali/Generali/Navbar';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SchermataPrincipale from './Components/SchermataPrincipale/SchermataPrincipale';
import SchermataLogin from './Components/Login/SchermataLogin';
import SchermataDiRegistrazione from './Components/SchermataDiRegistrazione/SchermataDiRegistrazione';
import ListaDatiPagamento from './Components/ListaDatiPagamento/ListaDatiPagamento';
import SchermataInserimentoDatiPagamento from './Components/SchermataInserimentoDatiPagamento/SchermataInserimentoDatiPagamento';
import SchermataRegistrazioneDipendente from './Components/SchermataRegistrazioneDipendente/SchermataRegistrazioneDipendente';  
import SchermataRegistrazioneMezzo from './Components/SchermataRegistrazioneMezzo/SchermataRegistrazioneMezzo';
import Footer from './Components/Generali/Generali/Footer';
import SchermataPrincipaleAmministratore from './Components/SchermataPrincipaleAmministratore/SchermataPrincipaleAmministratore';
import SchermataPrincipaleAutista from './Components/SchermataPrincipaleAutista/SchermataPrincipaleAutista';
import ListaDipendenti from './Components/ListaDipendenti/ListaDipendenti';
import ListaMezzi from './Components/ListaMezzi/ListaMezzi';
import ListaClienti from './Components/ListaClienti/ListaClienti';
import SchermataRegistrazioneCliente from './Components/SchermataRegistrazioneCliente/SchermataRegistrazioneCliente';

function App() {
  return(
    <>
      <Router>
        <Switch>
          <Route path ='*'>
            <div className="corpo">
           

              <Switch>
                  <Route exact path="/">
                    <SchermataPrincipale/>
                  </Route>
                  
                  <Route exact path="/Login">
                    <SchermataLogin/>
                  </Route>

                  <Route exact path="/SchermataDiRegistrazione">
                    <SchermataDiRegistrazione/>
                  </Route>

                  <Route exact path="/accessoeffettuato">
                    <h1>Accesso Effettuato</h1>
                  </Route>

                  <Route exact path="/ListaDatiPagamento">
                    <ListaDatiPagamento/>
                  </Route>

                  <Route exact path="/SchermataInserimentoDatiPagamento">
                    <SchermataInserimentoDatiPagamento/>
                  </Route>

                  <Route exact path="/SchermataRegistrazioneDipendente">
                    <SchermataRegistrazioneDipendente/>
                  </Route>

                  <Route exact path="/SchermataRegistrazioneMezzo">
                    <SchermataRegistrazioneMezzo/>
                  </Route>

                <Route exact path="/SchermataPrincipaleAmministratore">
                  <SchermataPrincipaleAmministratore/>
                </Route>

                <Route exact path="/SchermataPrincipaleAutista">
                  <SchermataPrincipaleAutista/>
                </Route>

                <Route exact path="/ListaDipendenti">
                  <ListaDipendenti/>
                </Route>

                <Route exact path="/ListaMezzi">
                  <ListaMezzi/>
                </Route>

                <Route exact path="/ListaClienti">
                  <ListaClienti/>
                </Route>

                <Route exact path="/SchermataRegistrazioneCliente">
                  <SchermataRegistrazioneCliente/>
                </Route>


              </Switch>
            </div> 
               <Footer/>        
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
