// require your server and launch it here
const dotenv = require("dotenv").config();
const express = require("express");

const app = express();
const port = process.env.PORT || 9000;

app.use(express.json());
app.use(express.static(path.join(__dirname,"client/build")))

app.use("/api/*", (_,res)=>{
    res.json({data:"THE API IS ALIVE"})
})

app.use("*",(_,res)=>{
    res.sendFile(path.join(__dirname, "client/build", "index.html"))
})

const server = require("./api/server.js");

server.listen(port, () => {
    console.log(`Server running on ${port} `);
});

