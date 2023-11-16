
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
        if(row==null){
            res=false
            console.log('null row');
        }   
        else if(row._id==data.secret) res=true
        else{
            res=false;
            console.log('secret not matching', data.secret, row._id.toString());
        }
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
        console.log(row);
    }finally {
    }
    return row
};

async function login(uid) {
    let id=''
    try {
        const database = client.db('users');
        const collection = database.collection('loggedinusers')
        
        const query = {email: uid}
        row = await collection.findOne(query);
        if(row==null){
            id=(await collection.insertOne(query)).insertedId;
        }else{
            id=row._id;
        }
    }finally{}
    return id
}

async function getUserData(uid) {
    let row=null
    try {
        const database = client.db('users');
        const collection = database.collection('userdata');

        const query = {email: uid}
        console.log(uid);
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

async function logout(data) {
    let r = null;

    try {
        const database = client.db('users');
        const collection = database.collection('loggedinusers');
        
        const loggedin = await isLoggedIn(data);

        if (loggedin==true){
            const query = { email: data.id }
            r=await collection.deleteOne(query);
        }
    }finally {

    }

    return r.deletedCount
}

const express = require('express');
const cors = require('cors');


const PORT = process.env.PORT || 3001

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended:true
}));

app.post('/check', async (req, res)=>{
    console.log('/check received');
    const uid = req.body.uid;
    const password = req.body.password;
    // const digest = crypto.createHash(algo).update(uid).digest();
    
    r = await isSignedUp(uid);
    if(r!=null){
        if(r.password == password){
            const id=await login(uid);
            const resp = {
                status: r,
                secret: id
            }
    
            res.send(JSON.stringify(resp));
        }else{
            res.send(JSON.stringify({status: false, reason: 'wrongcredentials'}));

        }
        
    }else{
        res.send(JSON.stringify({status: false, reason: 'norecordfound'}));
    }
});

app.post('/getinfo', async (req, res)=>{
    console.log('/getinfo received');
    data =(req.body.data);
    console.log(req.body);
    if(data.id==undefined){
        res.send(JSON.stringify({status: false, action: '/Login'}))
    }else{
        console.log(data.id);
        const loggedin = await isLoggedIn(data);
        console.log(loggedin);
        if(loggedin==false){
            res.send(JSON.stringify({status: false, action: '/Login'}))
        }else{
            var r = {status: true, data: { name: '', email: '' }}
            r.data = await getUserData(data.id);
            res.send(JSON.stringify(r));
        }
    
    }
    
});


app.post('/ifExists', async (req, res)=>{
    console.log('/ifExists received');

    const uid = req.body.uid;
    r = await isSignedUp(uid);
    res.send(JSON.stringify({status: r!=null}));
})

app.post('/createNewUser', async (req, res)=>{
    console.log('/createNewUser received');

    const d = req.body.data;
    r = await signup(d);
    console.log(r);
    res.send(JSON.stringify(r));

})

app.post('/logout', async (req, res)=>{
    console.log('/logout received');
    const d = req.body.data;
    r= await logout(d);
    res.send(JSON.stringify(r));
})

app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`)
});