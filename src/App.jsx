import React from "react";
import "./App.scss";
import Home from "./components/routes/Home";
import ResetPassword from "./components/routes/ResetPassword";
import Header from "./components/navbar/Header";
import About from "./components/routes/About";
import Tutorial from "./components/routes/Tutorial";
import Footer from "./components/navbar/Footer";
import { Link } from "react-router-dom";
import Editor from "./components/editor/Editor";
import EmailChangeSuccess from "./components/routes/EmailChangeSuccess";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/designer" exact component={Editor} />
        <Route path="/designer/:id" render={(props) => <Editor {...props} />} /> 
        <Route path='/help'  component={Tutorial}/>
        <Route>
          <div className="main-page">
            <Header />
            <div className="inner-body">
              <Switch>
                <Route path="/resetpassword/*" exact component={ResetPassword} />
                <Route path="/emailchangesuccess" exact component={EmailChangeSuccess} />
                <Route path="/about" exact component={About} />
                <Route path="/" exact component={Home} />
               
                <Route path='/nodiagramfound'  component= {NoDiagramFound}/>
                <Route path='/loginfirst'  component= {LogInFirst}/>
                <Route path='/whomadethis'  component= {WhoMadeThis}/>
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
      <Link to="/designer">
          <button className='home-button'>Back</button>
        </Link>
    </div>
  );
};

const LogInFirst = () => {
  document.title = "404";
  return (
    <div className="general-centered-container">
      <div className="container">
        <h1>Log in to see shared diagram</h1>
      </div>
      <Link to="/">
          <button className='home-button'>Home</button>
        </Link>
    </div>
  );
};

const WhoMadeThis = () => {
  document.title = "Who made this";
  return (
    <div className="general-centered-container" style={{width: '400px'}}>
      <div className="container">
      <h3>mariamaradou</h3>
         <a className="nav__link" href={'https://github.com/mariamaradou'} target="_blank" rel="noopener noreferrer">
         https://github.com/mariamaradou
        </a>
        <br/>
        <h3> raynesz </h3>
          <a className="nav__link" href={'https://github.com/raynesz'} target="_blank" rel="noopener noreferrer">
        https://github.com/raynesz
        </a>
      </div>
      
    </div>
  );
};

export default App;


