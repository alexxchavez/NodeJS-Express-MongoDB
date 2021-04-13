const MongoClient = require('mongodb').MongoClient;
const dboper = require('./operations');

const url = 'mongodb://localhost:27017/';
//sets up connection to the MongoDB server

const dbname = 'nucampsite';
//the name of the particular database to access

//MongoClient.connect method returns a promise and if connect method fails, it gets caught in the catch method at bottom
MongoClient.connect(url, { useUnifiedTopology: true}).then(client => {

    console.log('Connected correctly to server');
    //to the mongodb server

    const db = client.db(dbname);
    //this method connects to nucampsite database on the mongoDB server, can use db object to access set of methods to interact with database

    //deletes everything inside campsites collection and inserts document into collection, then lists docs in collection using find();
    db.dropCollection('campsites')
    .then(result => {
        console.log('Dropped Collection', result);
    })
    .catch(err => console.log('No collection to drop.'));
    //insert document into collection

    dboper.insertDocument(db, {name: "Breadcrumb Trail Campground", description: "Test"}, 'campsites')
    .then(result => {
        console.log('Insert Document:', result.ops);

            return dboper.findDocuments(db, 'campsites');
    })
    .then(docs => {
        console.log('Found Documents:', docs);

        return dboper.updateDocuments(db, { name: "Breadcrumb Trail Campground" }, 
            { description: "Updated Test Description"}, 'campsites');
    })
    .then(result => {
        console.log('Updated Document Count:', result.result.nModified);

        return dboper.findDocuments(db, 'campsites');
    })
    .then(docs => {
        console.log('Found Document:', docs);

        return dboper.removeDocuments(db, { name: "Breadcrumb Trail Campground" },
                'campsites');
    })
    .then(result => {
        console.log('Deleting Document Count:', result.deletedCount);
        
        return client.close();
    })
    .catch(err => {
        console.log(err);
        client.close();
    });
})
.catch(err => console.log(err));
