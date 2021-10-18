import React from "react";
import "./App.scss";
import Home from "./components/routes/Home";
import ResetPassword from "./components/routes/ResetPassword";
import Header from "./components/navbar/Header";
import About from "./components/routes/About";
import Tutorial from "./components/routes/Tutorial";
import Footer from "./components/navbar/Footer";

import Editor from "./components/editor/Editor";
import EmailChangeSuccess from "./components/routes/EmailChangeSuccess";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/erdmaker/designer" exact component={Editor} />
        <Route path="/erdmaker/designer/:id" render={(props) => <Editor {...props} />} /> 
        <Route path='/erdmaker/help'  component={Tutorial}/>
        <Route>
          <div className="main-page">
            <Header />
            <div className="inner-body">
              <Switch>
                <Route path="/erdmaker/resetpassword/*" exact component={ResetPassword} />
                <Route path="/erdmaker/emailchangesuccess" exact component={EmailChangeSuccess} />
                <Route path="/erdmaker/about" exact component={About} />
                <Route path="/erdmaker/" exact component={Home} />
               
                <Route path='/erdmaker/nodiagramfound'  component= {NoDiagramFound}/>
            
                <Route component={NoMatchPage} />
              </Switch>
              
            </div>
            <Footer />
          </div>
        </Route>
      </Switch>
    </Router>
  );
};

const NoMatchPage = () => {
  document.title = "404";
  return (
    <div className="general-centered-container">
      <div className="container">
        <h1>404 - Nope, nothing here.</h1>
      </div>
    </div>
  );
};

const NoDiagramFound = () => {
  document.title = "404";
  return (
    <div className="general-centered-container">
      <div className="container">
        <h1>This link doesn't exist or has been deleted.</h1>
      </div>
    </div>
  );
};

export default App;


