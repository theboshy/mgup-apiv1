const MongoClient = require('mongodb').MongoClient;

exports.mongoCon = function() {
    var dataBase = MongoClient.connect("mongodb://localhost:27017/images_test", function (err, db) {
        if(err) {console.log("error");throw err};
        return db;         
    });
    return dataBase;
}

