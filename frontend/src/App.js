import React from 'react';
import Header from "./components/Header";
import MainPage from "./containers/MainPage";
import InfoPage from "./containers/InfoPage";
import GroupBulletin from "./components/GroupBulletin";
import LoginPage from "./containers/LoginPage";
import './App.css';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

function App() {
    return(
        <Router>
            <Route path="/" exact component={LoginPage}/>
            <Route path="/mainPage" component={MainPage}/>
            <Route path="/infoPage" component={InfoPage}/>
            <Route path="/groupBulletin" component={GroupBulletin}/>
        </Router>
    )
}

export default App