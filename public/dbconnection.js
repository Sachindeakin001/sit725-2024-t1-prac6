
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://sachin832002:eITVFtGyHiYvRucO@cluster0.gisni4q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

module.exports = client;
