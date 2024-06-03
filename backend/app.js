const { MongoClient, ObjectId } = require("mongodb");
const jwt = require('jsonwebtoken');
const express = require('express');
const cors = require('cors');

const secretKey = '123';
const app = express();
const port = 3001;

async function connect(){
  if(global.db) return global.db;
    const conn = await MongoClient.connect("mongodb+srv://antonio:oiblin123@cluster.wn0uyzg.mongodb.net/?retryWrites=true&w=majority&appName=cluster");
  if(!conn) return new Error("Can't connect");
    global.db = await conn.db("test");
  return global.db;
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const router = express.Router();

router.get('/', (req, res) => res.json({ message: 'Funcionando!' }));

router.get('/dog', async function(req, res, next) {
  try {
    const apidog = await fetch('https://dog.ceo/api/breed/hound/list');
    res.json(await apidog.json());
  } catch(ex) {
    console.log(ex);
    res.status(400).json({ erro: `${ex}` });
  }
});

// USER CRUD Routes
router.get('/users/:id?', async function(req, res, next) {
    try {
        const db = await connect();
        if (req.params.id) {
            res.json(await db.collection("users").findOne({ _id: new ObjectId(req.params.id) }));
        } else {
            res.json(await db.collection("users").find().toArray());
        }
    } catch (ex) {
        console.log(ex);
        res.status(400).json({ erro: `${ex}` });
    }
});

router.post('/users', async function(req, res, next) {
    try {
        const users = req.body;
        const db = await connect();
        res.json(await db.collection("users").insertOne(users));
    } catch (ex) {
        console.log(ex);
        res.status(400).json({ erro: `${ex}` });
    }
});

router.put('/users/:id', async function(req, res, next) {
    try {
        const users = req.body;
        const db = await connect();
        res.json(await db.collection("users").updateOne({ _id: new ObjectId(req.params.id) }, { $set: users }));
    } catch (ex) {
        console.log(ex);
        res.status(400).json({ erro: `${ex}` });
    }
});

router.delete('/users/:id', async function(req, res, next) {
    try {
        const db = await connect();
        res.json(await db.collection("users").deleteOne({ _id: new ObjectId(req.params.id) }));
    } catch (ex) {
        console.log(ex);
        res.status(400).json({ erro: `${ex}` });
    }
});

// LOGIN/REGISTER Routes
router.post('/register', async function(req, res, next) {
    const { name, email, password } = req.body;
    try {
        const db = await connect();
        const user = await db.collection("users").findOne({ email, password });
        if (user) {
            return res.status(400).json({ errors: [{ msg: 'Usuário já existe.' }] });
        }
        const newUser = { name, email, password };
        res.json(await db.collection("users").insertOne(newUser));
    } catch (ex) {
        console.log(ex);
        res.status(408).json({ erro: `${ex}` });
    }
});

router.post('/login', async function(req, res, next) {
    const { email, password } = req.body;
    try {
        const db = await connect();
        const user = await db.collection("users").findOne({ email, password });
        if (!user) {
            return res.status(400).json({ errors: [{ msg: 'Credenciais inválidas.' }] });
        }

        const token = jwt.sign({ id: user._id, email: user.email }, secretKey, { expiresIn: '1h' });

        res.json({ token });
    } catch (ex) {
        console.log(ex);
        res.status(500).json({ error: `${ex}` });
    }
});

app.use('/', router);

app.listen(port, () => {
    console.log(`Rodando em ${port}`);
});