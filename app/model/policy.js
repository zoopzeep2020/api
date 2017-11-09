/**
 * Created by crosp on 5/8/17.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
let PolicySchema = new Schema({    
    title: String,
    content:String,
    dateCreated: { type: Date, default: Date.now },
    dateModified: { type: Date, default: Date.now },
});
PolicySchema.pre('update', function(next, done) {
    this.dateModified = Date.now();
    next();
});
PolicySchema.pre('save', function(next, done) {
    this.dateModified = Date.now();
    next();
});
PolicySchema.methods.toJSON = function() {
    let obj = this.toObject();
    delete obj.__v;
    return obj
};
module.exports.PolicyModel = mongoose.model('Policy', PolicySchema);