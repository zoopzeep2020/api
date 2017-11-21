/**
 * Created by crosp on 5/8/17.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
let KeywordSchema = new Schema({
    title: String,
    viewCount: Number,
    dateCreated: { type: Date, default: Date.now },
    dateModified: { type: Date, default: Date.now }
});
KeywordSchema.pre('update', function(next, done) {
    this.dateModified = Date.now();
    next();
});
KeywordSchema.pre('save', function(next, done) {
    this.dateModified = Date.now();
    next();
});
KeywordSchema.methods.toJSON = function() {
    let obj = this.toObject();
    delete obj.__v;
    delete obj.dateModified;
    delete obj.dateCreated;
    return obj
};
module.exports.KeywordModel = mongoose.model('Keyword', KeywordSchema);