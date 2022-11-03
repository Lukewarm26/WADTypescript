//Lucas Eifert


import { Request, Response, Application } from 'express';

interface Info {
    username : string;
    password : string;
}

const express = require('express')
const bodyParser = require("body-parser");

const app = express()
const port = 8080

app.use(express.static(__dirname +"/client"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());




app.post("/login", async function(req : Request, res : Response) {
    let creds : Info = {username: req.body.Username , password: req.body.Password} 
     let success = await login(creds);
     if(success) res.end("yes");
     else res.end("no");
})

app.post("/signup", async function(req : Request, res : Response) {
  let creds : Info = {username: req.body.Username , password: req.body.Password} 
  let success = await signup(creds);
  if(success) res.end("yes"); 
  else res.end("no");
})

var redis = require("redis");
var db_client = redis.createClient();
db_client.connect();
db_client.on('connect', function()
{
    console.log('conencted!')
})



async function login(obj : Info) {
  let value: string = await db_client.get(obj.username);

  if(value === obj.password) return true;
  else return false;
}

async function signup(obj : Info) {
  let value: string = await db_client.sendCommand(['keys','*']);
  for(let i = 0; i < value.length; i++) {
    if(obj.username === value[i]) return false;
  }
  await db_client.set(obj.username,obj.password);
  return true; 
}
