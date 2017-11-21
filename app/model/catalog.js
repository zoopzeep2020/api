/**
 * Created by crosp on 5/8/17.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
let CatalogSchema = new Schema({
    storeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store'
    },
    catalogUrl: String,
    catalogDescription: String,
    viewCount: Number,
    dateCreated: { type: Date, default: Date.now },
    dateModified: { type: Date, default: Date.now },
});
CatalogSchema.methods.toJSON = function() {
    let obj = this.toObject();
    delete obj.__v;
    delete obj.dateModified;
    delete obj.dateCreated;
    return obj
};
module.exports.CatalogModel = mongoose.model('Catalog', CatalogSchema);