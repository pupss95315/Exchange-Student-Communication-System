import React from 'react';
import { useState } from 'react';
import MainPage from "./containers/MainPage";
import InfoPage from "./containers/InfoPage";
import LoginPage from "./containers/LoginPage";
import './App.css';
import { Route, Switch } from 'react-router-dom';

function App() {
    // const location = useLocation;
    const [isLogin, setIsLogin] = useState(false)
    //const [id, setId] = useState("")
    if (localStorage.getItem("isLogin") !== null && isLogin !== localStorage.getItem("isLogin"))
        setIsLogin(localStorage.getItem("isLogin"));
    console.log("isLogin = ", isLogin)
    // const [page, setPage] = useState(false)
    
    return(
        <>
            <Switch>      
                <Route exact path="/" component={LoginPage}/>
                <Route path="/mainPage/" component={MainPage}/>
                <Route path="/infoPage/:group/" component={InfoPage}/>
            </Switch>
            {/* <Footer></Footer> */}
        </>
    )
}

export default App