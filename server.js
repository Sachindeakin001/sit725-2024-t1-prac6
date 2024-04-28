var express = require("express")
var app = express()
let port = process.env.port || 3000;
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://sachin832002:eITVFtGyHiYvRucO@cluster0.gisni4q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
let collection;

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function runDB() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        collection = client.db().collection('Cats');
        console.log(collection);
    } catch (ex) {
        console.error(ex);
    }
}
async function postCat(cat) {
    try {
        const result = await collection.insertOne(cat);
        return result;
    } catch (err) {
        console.error(err);
        throw err;
    }
}


async function getAllCats() {
    try {
        const cats = await collection.find({}).toArray();
        return cats;
    } catch (err) {
        console.error(err);
        throw err;
    }
}


app.get('/', function (req, res) {
    res.render('index.html');
});

app.post('/api/cat', async (req, res) => {
    try {
        const card = req.body;
        const result = await postCat(card);
        res.json({ statusCode: 201, data: result, message: 'success' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ statusCode: 500, message: 'Internal server error' });
    }
});



app.get('/api/cats', async (req, res) => {
    try {
        const result = await getAllCats();
        res.json({ statusCode: 200, data: result, message: 'get all cats successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ statusCode: 500, message: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log('express server started');
    runDB();
});