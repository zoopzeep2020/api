/**
 * Created by WebrexStudio on 5/8/17.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
let StaticPageSchema = new Schema({    
    title: String,
    content:String,
    type:String,
    URL:String,
    dateCreated: { type: Date, default: Date.now },
    dateModified: { type: Date, default: Date.now },
});
StaticPageSchema.pre('update', function(next, done) {
    this.dateModified = Date.now();
    next();
});
StaticPageSchema.pre('save', function(next, done) {
    this.dateModified = Date.now();
    next();
});
StaticPageSchema.methods.toJSON = function() {
    let obj = this.toObject();
    delete obj.__v;
    return obj
};
module.exports.StaticPageModel = mongoose.model('StaticPage', StaticPageSchema);