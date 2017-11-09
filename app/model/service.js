/**
 * Created by crosp on 5/8/17.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
let ServiceSchema = new Schema({    
    title: String,
    content:String,
    dateCreated: { type: Date, default: Date.now },
    dateModified: { type: Date, default: Date.now },
});
ServiceSchema.pre('update', function(next, done) {
    this.dateModified = Date.now();
    next();
});
ServiceSchema.pre('save', function(next, done) {
    this.dateModified = Date.now();
    next();
});
ServiceSchema.methods.toJSON = function() {
    let obj = this.toObject();
    delete obj.__v;
    return obj
};
module.exports.ServiceModel = mongoose.model('Service', ServiceSchema);