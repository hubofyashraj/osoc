
const { MongoClient } = require('mongodb')

const uri = "mongodb://127.0.0.1:27017"

const client = new MongoClient(uri)


async function isLoggedIn(data) {
    let res=false;
    try {
        const database = client.db('users');
        const collection = database.collection('loggedinusers');
        const query = {email: data.id };
        row = await collection.findOne(query);
        if(row==null)   res=false
        else if(row._id==data.secret) res=true
        else   res=false;
    }finally{

    }
    return res;
}

async function isSignedUp(uid) {
    let row=null
    try {
        const database = client.db('users');
        const collection = database.collection('userdata');

        const query = {email: uid};
        row = await collection.findOne(query);
    }finally {
    }
    return row!=null
};

async function login(uid) {
    let id=''
    try {
        const database = client.db('users');
        const collection = database.collection('loggedinusers')
        
        const query = {email: uid}
        id=(await collection.insertOne(query)).insertedId;
    }finally{}
    return id
}

async function getUserData(uid) {
    let row=null
    try {
        const database = client.db('users');
        const collection = database.collection('userdata');

        const query = {email: uid}
        row = await collection.findOne(query);
        
    }finally {
    }

    return row


}

async function signup(data) {
    let r=null
    try {
        const database = client.db('users');
        const collection = database.collection('userdata')
        const query = data;

        r = await collection.insertOne(query);
    }finally {
    }

    return r
}

const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
let algo = "sha256"


const PORT = process.env.PORT || 3001

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended:true
}));

app.post('/check', async (req, res)=>{
    const uid = req.body.uid;
    // const digest = crypto.createHash(algo).update(uid).digest();
    
    r = await isSignedUp(uid);
    if(r==true){
        const id=await login(uid);
        const resp = {
            status: r,
            secret: id
        }

        res.send(JSON.stringify(resp));
    }else{
        res.send(JSON.stringify({status: false}));
    }
});

app.post('/getinfo', async (req, res)=>{
    data =(req.body.data);
    if(data.id==undefined){
        res.send(JSON.stringify({status: false, action: '/Login'}))
    }else{
        const loggedin = await isLoggedIn(data);
        if(loggedin==false){
            res.send(JSON.stringify({status: false, action: '/Login'}))
        }else{
            r = {status: true}
            r.data = await getUserData(data.uid);
            res.send(JSON.stringify(r));
        }
    
    }
    
});


app.post('/ifExists', async (req, res)=>{
    const uid = req.body.uid;
    r = await isSignedUp(uid);
    res.send(JSON.stringify({status: r}));
})

app.post('/createNewUser', async (req, res)=>{
    const d = req.body.data;
    r = await signup(d);
    res.send(JSON.stringify(r));

})

app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`)
});