import React from 'react'
import './Main.css'
import HTTPRequest from "./HTTPRequest";

const Main = () =>
    <div>
        <h1 className="heading">Hello World!</h1>
        <h3 className="introduction">This project is for understanding the frontend environment settings</h3>
        <div>---</div>
        <p>HTTP Request Component:</p>
        <HTTPRequest />
    </div>

export default Main