//four methods to insert, find, remove and update documents

const assert = require('assert').strict;

exports.insertDocument =(db, document, collection, callback) => {
    //db that is being used, document that is inserted, the collection document is in, 
    //and a callback function that will be called at the end of each method

    const coll = db.collection(collection);
    //collection argument passed in will be a string

    coll.insertOne(document, (err, result) => {
        assert.strictEqual(err, null);
        //if err is null we have no problems

        callback(result);
    });
};

exports.findDocuments = (db, collection, callback) => {
    const coll = db.collection(collection);
    coll.find().toArray((err, docs) => {
        assert.strictEqual(err, null);
        callback(docs);
    })
};

exports.removeDocuments = (db, document, collection, callback) => {
    const coll = db.collection(collection);
    coll.deleteOne(document, (err, result) => {
        assert.strictEqual(err, null);
        callback(result);
    });
};

exports.updateDocuments = (db, document, update, collection, callback) => {
    const coll = db.collection(collection);
    coll.updateOne(document, { $set: update }, null, (err, result) => {
        assert.strictEqual(err, null);
        callback(result);
    });
};