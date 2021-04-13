//four methods to insert, find, remove and update documents

exports.insertDocument =(db, document, collection) => {
    //db that is being used, document that is inserted, the collection document is in, 
    //and a callback function that will be called at the end of each method

    const coll = db.collection(collection);
    //collection argument passed in will be a string

    return coll.insertOne(document);
};

exports.findDocuments = (db, collection,) => {
    const coll = db.collection(collection);
    return coll.find().toArray();
};

exports.removeDocuments = (db, document, collection,) => {
    const coll = db.collection(collection);
    return coll.deleteOne(document);
};

exports.updateDocuments = (db, document, update, collection,) => {
    const coll = db.collection(collection);
    return coll.updateOne(document, { $set: update}, null);
};