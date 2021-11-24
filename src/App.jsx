import React from 'react';
import { Route, Switch } from 'react-router';
import "./App.scss"
import Header from './views/components/Header/Header';
import AboutPage from './views/routes/AboutPage/AboutPage';
import MainPage from "./views/routes/MainPage/MainPage.jsx";
import ProfilePage from './views/routes/ProfilePage/ProfilePage';
import LoginPage from './views/routes/LoginPage/LoginPage';


function App(props) {
    return (
        <>
        <Header/>
        <Switch>
            <Route exact path="/"><MainPage/></Route>
            <Route path="/about"><AboutPage/></Route>
            <Route path="/profile"><ProfilePage/></Route>
            <Route path="/start"><LoginPage/></Route>
            <Route><p style={{width : "100vw", height : "100vh", display : "flex", justifyContent  :"center", alignItems : "center"}}>Error : Page not found</p></Route>
        </Switch>
        </>
    );
}

export default App;