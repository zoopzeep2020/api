/**
 * Created by crosp on 5/8/17.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
let CollectionSchema = new Schema({
    storeId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store'
    }],
    catalogId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Catalog'
    }],
    offerId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Offer'
    }],
    location: {
        type: [Number],  // [<longitude>, <latitude>]
        index: '2dsphere'      // create the geospatial index
    },
    buisnessOnline: Boolean,
    buisnessOffline: Boolean,
    collectionName: String,
    collectionType: String,
    collectionPicture: String,
});
CollectionSchema.pre('update', function(next, done) {
    this.dateModified = Date.now();
    next();
});
CollectionSchema.pre('save', function(next, done) {
    this.dateModified = Date.now();
    next();
});
CollectionSchema.methods.toJSON = function() {
    let obj = this.toObject();
    delete obj.__v;
    delete obj.dateModified;
    delete obj.dateCreated;
    return obj
};
module.exports.CollectionModel = mongoose.model('Collection', CollectionSchema);