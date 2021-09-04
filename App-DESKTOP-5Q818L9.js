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
import SchermataRegistrazioneAutista from './Components/SchermataRegistrazioneAutista/SchermataRegistrazioneAutista';  
import SchermataRegistrazioneMezzo from './Components/SchermataRegistrazioneMezzo/SchermataRegistrazioneMezzo';
import Footer from './Components/Generali/Generali/Footer';
import SchermataPrincipaleAmministratore from './Components/SchermataPrincipaleAmministratore/SchermataPrincipaleAmministratore';
import GestioneMezzi from './Components/GestioneMezzi/GestioneMezzi';

function App() {
  return(
    <>
      <Router>
        <Switch>
          <Route path ='*'>
            <div className="corpo">
              <Navbar/>

              <Switch>
                  <Route exact path="/">
                    <SchermataPrincipale/>
                  </Route>
                  
                  <Route exact path="/login">
                    <SchermataLogin/>
                  </Route>

                  <Route exact path="/registrazione">
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

                  <Route exact path="/SchermataRegistrazioneAutista">
                    <SchermataRegistrazioneAutista/>
                  </Route>

                  <Route exact path="/SchermataRegistrazioneMezzo">
                    <SchermataRegistrazioneMezzo/>
                  </Route>

                  <Route exact path="/ListaMezzi">
                    <GestioneMezzi/>
                  </Route>

                <Route exact path="/SchermataPrincipaleAmministratore">
                  <SchermataPrincipaleAmministratore/>
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
