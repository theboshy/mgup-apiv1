var mongoose = require('mongoose');
var mgoDriver= require('../driver/mongo_driver');
var Schema = mongoose.Schema;
/*var fs = require('fs');
var imgPath = '/home/wanabe/Escritorio/descarga.jpeg';*/
var imageModel = require('../models/images_model.js');


exports.insertDocumentChunks = function(obj) {
   
    var A = mongoose.model(obj.collectionName, imageModel);
    var a = new A;
    a.img.data = obj.imageData
    a.img.contentType = obj.imageType;
    a.metadata = obj.metadata
    //console.log(fs.readFileSync(imgPath))
    var db = mgoDriver.mgoCon()

    db.on('error', console.error.bind(console, 'connection error:'));
    //db.once
    db.once('open', function() {
        console.log("conection !") 
        a.save(function (err, a) {
            if (err) throw err;
            console.error('saved img to mongo');
        });
        
    });

    
} 