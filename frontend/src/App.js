import React, { useState } from 'react';
import Header from "./components/Header";
// import Footer from "./components/Footer";
import MainPage from "./containers/MainPage";
import InfoPage from "./containers/InfoPage";
import LoginPage from "./containers/LoginPage";
import './App.css';
import { BrowserRouter as Router, Route, Link, useLocation } from 'react-router-dom';
import { Switch } from 'react-router-dom';
// import urlEncrypt from 'url-encrypt';

// const encryptor = urlEncrypt({/* secretKey: .. .. another options */});
// encryptor.config({
//     secretKey: 'some-secret-key',
//     prefix: 'psx_',
//     expiredAfterSeconds: 900,
//     algorithm: 'sha256',
//     oversight: 30
// });

function App() {
    const location = useLocation();
    const [isLogin, setIsLogin] = useState(false)
    const [id, setId] = useState("")
    
    return(
        <>
            { location.pathname ==='/' ? null: <Header id={id}/> }
            <Switch>      
                <Route exact path="/" component={LoginPage} />
                <Route path="/mainPage/:id" component={MainPage} />
                <Route path="/infoPage/group?=:group/id?=:id" component={InfoPage} />
            </Switch>
            {/* <Footer></Footer> */}
        </>
    )
}

export default App