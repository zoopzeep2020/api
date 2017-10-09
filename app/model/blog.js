/**
 * Created by crosp on 5/8/17.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
let BlogSchema = new Schema({    
    title: String,
    blogPicture:String,
    description:String,
    dateCreated: { type: Date, default: Date.now },
    dateModified: { type: Date, default: Date.now },
});
BlogSchema.pre('update', function(next, done) {
    this.dateModified = Date.now();
    next();
});
BlogSchema.pre('save', function(next, done) {
    this.dateModified = Date.now();
    next();
});
BlogSchema.methods.toJSON = function() {
    let obj = this.toObject();
    delete obj.__v;
    delete obj.dateModified;
    delete obj.dateCreated;
    return obj
};
module.exports.BlogModel = mongoose.model('Blog', BlogSchema);