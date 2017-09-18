/**
 * Created by crosp on 5/8/17.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
let CatalogSchema = new Schema({
    catalogUrl: String,
    catalogDescription: String,
    dateCreated: { type: Date, default: Date.now },
    dateModified: { type: Date, default: Date.now },
});
CatalogSchema.pre('update', function(next, done) {
    this.dateModified = Date.now();
    next();
});
CatalogSchema.pre('save', function(next, done) {
    this.dateModified = Date.now();
    next();
});
CatalogSchema.methods.toJSON = function() {
    let obj = this.toObject();
    console.log(obj);
    delete obj.__v;
    delete obj.dateModified;
    delete obj.dateCreated;
    return obj
};
module.exports.CatalogModel = mongoose.model('Catalog', CatalogSchema);