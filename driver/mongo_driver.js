
var mongoose = require('mongoose');
module.exports = {
    mgoCon: function () {
        mongoose.connect('mongodb://localhost/images_test', {useNewUrlParser: true});
        var db = mongoose.connection;
        return db;
    
    },

  };

