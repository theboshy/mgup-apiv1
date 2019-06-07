var mongoose = require('mongoose');

module.exports = {
    /**
     * establece una conexion a la base de datos mongo mediante la url establecida
     */
    mgoCon: function () {
        //todo: replace url for vars or envs
        mongoose.connect('mongodb://localhost/images_test', {useNewUrlParser: true});
        var db = mongoose.connection;
        return db;
    
    },

  };

