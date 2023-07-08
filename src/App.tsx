import React, {useState} from 'react';
import './App.css';
import RubDollarApp from "./rubDollar/RubDollarApp";
import AppPractice3App from "./practice3/AppPractice3App";
import AppPractice3axis from "./practice3axis/AppPractice3axis";
import {OnOff} from "./OnOff/OnOff";


function App() {


    return (
        <div className="App">
        {/*<RubDollarApp />*/}
        {/*    <AppPractice3App />*/}
        {/*    <AppPractice3axis />*/}

            <OnOff />

        </div>
    );
}

export default App;
