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
import SchermataGestioneMezzo from './Components/GestioneMezzi/SchermataGestioneMezzo'
import SchermataGestioneCliente from './Components/GestioneCliente/SchermataGestioneCliente';
import SchermataGestioneDatiPagamento from './Components/GestioneDatiPagamento/SchermataGestioneDatiPagamento';
import SchermataGestioneDipendente from './Components/GestionePersonale/SchermataGestioneDipendente';
import SchermataPrincipaleCliente from './Components/SchermataPrincipaleCliente/SchermataPrincipaleCliente';
import SchermataModificaDatiPagamento from './Components/ModificaDatoPagamento/SchermataInserimentoDatiPagamento';
import SchermataPrincipaleGestoreParcheggio from './Components/SchermataPrincipaleGestoreParcheggio/SchermataPrincipaleGestoreParcheggio';
import SchermataModificaMezzo from './Components/ModificaMezzo/SchermataModificaMezzo';
import SchermataModificaCliente from './Components/ModificaClienti/SchermataModificaCliente';
import SchermataModificaDipendente from './Components/Modifica Dipendenti/SchermataModificaDipendente';
import SchermataRisultati from './Components/SchermataRisultati/SchermataRisultati';
import SchermataPrenotazione from './Components/SchermataPrenotazione/SchermataPrenotazione';
import SchermataListaPrenotazioni from './Components/ListaPrenotazioni/ListaPrenotazioni';
import SchermataModificaPrenotazione from './Components/SchermataModificaPrenotazione/SchermataModificaPrenotazione';
import GestionePrenotazione from './Components/GestionePrenotazione/GestionePrenotazione';
import Nav from './Components/Generali/Generali/Nav';
import SchermataPersonaleUtente from './Components/SchermataPersonaleUtente/SchermataPersonaleUtente';
import ListaCorse from './Components/SchermataAccettazioneCorse/ListaCorse';

function App() {
  return(
    <>
      <Router>
        <Switch>
          <Route path ='*'>
            <div className="corpo">          
              <Nav/>
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

                <Route exact path="/SchermataGestioneMezzo">
                  <SchermataGestioneMezzo/>
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

                <Route exact path="/SchermataGestioneCliente">
                  <SchermataGestioneCliente/>
                </Route>

                <Route exact path="/SchermataGestioneDatiPagamento">
                  <SchermataGestioneDatiPagamento/>
                </Route>

                <Route exact path="/SchermataGestioneDipendente">
                  <SchermataGestioneDipendente/>
                </Route>

                <Route exact path="/SchermataPrincipaleCliente">
                  <SchermataPrincipaleCliente/>
                </Route>

                <Route exact path="/ModificaDatoPagamento">
                  <SchermataModificaDatiPagamento/>
                </Route>

                <Route exact path="/SchermataPrincipaleGestoreParcheggio">
                  <SchermataPrincipaleGestoreParcheggio/>
                </Route>

                <Route exact path="/SchermataModificaMezzo">
                  <SchermataModificaMezzo/>
                </Route>

                <Route exact path="/SchermataModificaCliente">
                  <SchermataModificaCliente/>
                </Route>

                <Route exact path="/SchermataModificaDipendente">
                  <SchermataModificaDipendente/>
                </Route>

                <Route exact path="/SchermataRisultati">
                  <SchermataRisultati/>
                </Route>

                <Route exact path="/SchermataPrenotazione">
                  <SchermataPrenotazione/>
                </Route>

                <Route exact path="/SchermataGestionePrenotazioni">
                  <SchermataListaPrenotazioni/>
                </Route>

                <Route exact path="/GestionePrenotazione">
                  <GestionePrenotazione/>
                </Route>

                <Route exact path="/SchermataModificaPrenotazione">
                  <SchermataModificaPrenotazione/>
                </Route>

                <Route exact path="/SchermataPersonaleUtente">
                  <SchermataPersonaleUtente/>
                </Route>

                <Route exact path="/ListaCorse">
                  <ListaCorse/>
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
