import React, { useState } from 'react';
import Header from "./components/Header";
import MainPage from "./containers/MainPage";
import InfoPage from "./containers/InfoPage";
import GroupBulletin from "./components/GroupBulletin";
import LoginPage from "./containers/LoginPage";
import './App.css';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Link, useLocation } from 'react-router-dom';
import { BrowserRouter, Switch } from 'react-router-dom';

function App() {
    const location = useLocation();
    const [isLogin, setIsLogin] = useState(false)
    
    //console.log(history.location.pathname)
    return(
        <>
            {/* {
              location.pathname ==='/' ? null:<Header/>
            } */}
            {/* <Header/> */}
            <Switch>      
                <Route exact path="/" component={LoginPage}/>
                <Route path="/mainPage" component={MainPage}/>
                <Route path="/infoPage" component={InfoPage}/>
                {/* <Route path="/groupBulletin" component={GroupBulletin}/> */}
            </Switch>
        </>
    )
}

export default App