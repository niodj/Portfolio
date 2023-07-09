import React, {useState} from 'react';
import './App.css';
import EuroDollarApp from "./EurosDollars/EuroDollarApp";
import AppPractice3App from "./practice3/AppPractice3App";
import AppPractice3axis from "./practice3axis/AppPractice3axis";
import {OnOff} from "./OnOff/OnOff";
import {Rating} from "./Rating/Rating";


function App() {


    return (
        <div className="App">
            <EuroDollarApp/><hr/>
            <Rating/><hr/>
            <OnOff /><hr/>
            {/*    <AppPractice3App />*/}
            {/*    <AppPractice3axis />*/}


        </div>
    );
}

export default App;
