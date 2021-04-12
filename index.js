const MongoClient = require('mongodb').MongoClient;
const assert = require('assert').strict;
const dboper = require('./operations');

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

        //const collection = db.collection('campsites');
        //recreates campsites selection and gains access to it, removed because doing through dboper

        //insert document into collection
        dboper.insertDocument(db, {name: "Breadcrumb Trail Campground", description: "Test"},
            'campsites', result => {
            console.log('Insert Document:', result.ops);

            dboper.findDocuments(db, 'campsites', docs => {
                console.log('Found Documents:', docs);

                dboper.updateDocuments(db, { name: "Breadcrumb Trail Campground" }, 
                    { description: "Updated Test Description"}, 'campsites', 
                    result => {
                        console.log('Updated Document Count:', result.result.nModified);

                        dboper.findDocuments(db, 'campsites', docs => {
                            console.log('Found Document:', docs);

                            dboper.removeDocuments(db, { name: "Breadcrumb Trail Campground" },
                                'campsites', result => {
                                    console.log('Deleting Document Count:', result.deletedCount);
                                    client.close();
                                }
                            );
                        });
                    }
                );
            });
        });
    });
});
