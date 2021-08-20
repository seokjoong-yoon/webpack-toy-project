const express = require('express');
const app = express()

app.get("/", function(req, res) {
    res.json({"result": "success"});
})

app.get("/api/keywords", function(req, res){
    res.header("Access-Control-Allow-Origin", "*"); // server-side solution for CORS policy
    res.json([{"keywords": "response-from"}, {"keyword": "node-api-server"}]);
})

app.listen(8080, function(){
    console.log('express server is running on port 8080');
})

// node server/server.js