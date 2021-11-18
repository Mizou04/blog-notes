import React from 'react';
import { Route, Switch } from 'react-router';
import "./App.scss"
import Header from './views/components/Header/Header';
import AboutPage from './views/routes/AboutPage/AboutPage';
import MainPage from "./views/routes/MainPage/MainPage.jsx";


function App(props) {
    return (
        <>
        <Header/>
        <Switch>
            <Route exact path="/"><MainPage/></Route>
            <Route path="/about"><AboutPage/></Route>
        </Switch>
        </>
    );
}

export default App;