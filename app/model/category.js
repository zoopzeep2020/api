/**
 * Created by crosp on 5/8/17.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
let CategorySchema = new Schema({
    category: String,
    categoryImage: String,
    categoryActiveImage: String,
    dateCreated: { type: Date, default: Date.now },
    dateModified: { type: Date, default: Date.now },
});
CategorySchema.pre('update', function(next, done) {
    this.dateModified = Date.now();
    next();
});
CategorySchema.pre('save', function(next, done) {
    this.dateModified = Date.now();
    next();
});
CategorySchema.methods.toJSON = function() {
    let obj = this.toObject();
    console.log(obj);
    delete obj.__v;
    delete obj.dateModified;
    delete obj.dateCreated;
    return obj
};
module.exports.CategoryModel = mongoose.model('Category', CategorySchema);