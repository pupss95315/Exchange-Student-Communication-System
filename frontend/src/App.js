import React from 'react';
import Header from "./components/Header";
import MainPage from "./containers/MainPage";
import InfoPage from "./containers/InfoPage";
import LoginPage from "./containers/LoginPage";
import './App.css';
import { Route, Redirect, useLocation, Switch } from 'react-router-dom';

function App() {
    const location = useLocation();
    //const [isLogin, setIsLogin] = useState(false)
    //const [id, setId] = useState("")
    let isLogin = localStorage.getItem("isLogin")
    
    return(
        <>
            {
                location.pathname ==='/' ? null:<Header/>
            }
            <Switch>      
                <Route exact path="/" component={LoginPage}/>
                {
                    isLogin?
                    (
                        <Route path="/mainPage/:id" component={MainPage}/>
                    ):
                    (<Redirect to={{ pathname: '/', state: { msg: "msg" }}}/>)
                }
                <Route path="/infoPage/:group/:id" component={InfoPage}/>
            </Switch>
            {/* <Footer></Footer> */}
        </>
    )
}

export default App