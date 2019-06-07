var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var imageSchema = new Schema({
    img: { data: Buffer, contentType: String },
    metadata : {}
});
module.exports = imageSchema;

