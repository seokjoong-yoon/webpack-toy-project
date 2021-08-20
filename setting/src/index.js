import React from "react";
import ReactDOM from "react-dom";
import Main from "./routers/Main";

ReactDOM.render(<Main />, document.getElementById("root"));

console.log(process.env.NODE_ENV); // logs webpack config's mode by the webpack.DefinePlugin
