const MongoClient = require('mongodb').MongoClient;
const assert = require('assert').strict;

const url = 'mongodb://localhost:27017/';
//sets up connection to the MongoDB server

const dbname = 'nucampsite';
//the name of the particular database to access

MongoClient.connect(url, { useUnifiedTopology: true}, (err, client) => {

    assert.strictEqual(err, null);
    //first argument (err) is the actual value checking, second (null) is the expected value checked against
    //if actual and expected arguments match then will continue on
    //if actual and expected arguments do not match then assert will fail, which will throw an error and terminate app
    console.log('Connected correctly to server');
    //to the mongodb server

    const db = client.db(dbname);
    //this method connects to nucampsite database on the mongoDB server, can use db object to access set of methods to interact with database

    //deletes everything inside campsites collection and inserts document into collection, then lists docs in collection using find();
    db.dropCollection('campsites', (err, result) => {
        assert.strictEqual(err, null);
        console.log('Dropped Collection', result);

        const collection = db.collection('campsites');
        //recreates campsites selection and gains access to it

        //insert document into collection
        collection.insertOne({name: "Breadcrumb Trail Campground", description: "Test"},
        (err, result) =>{
        //callback pattern with error handling convention for Node

            assert.strictEqual(err, null);
            //checks if any error

            console.log('Insert Document:', result.ops);
            //ops is short for operation and depending on the method, it can contain different values

            //print to console all documents in collection.toArray() converts documents to an array of objects so that it can be console logged
            collection.find().toArray((err, docs) => {
                assert.strictEqual(err, null);
                console.log('Found Documents:', docs);

                client.close();
            });
        });
    });
});
