/**
 * Created by WebrexStudio on 5/8/17.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
let StoreSchema = new Schema({
    storeName: String,
    storeLogo: String,
    storeBanner: String,
    categoriesIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }],
    buisnessOnline: Boolean,
    buisnessOffline: Boolean,
    buisnessBoth: Boolean,
    address: String,
    storePhone: Number,
    storeDiscription: String,
    keyword: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'keyword'
    }],
    bookmarkBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }],
    featureCatalog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'catalog'
    },
    otherKeyword: [],
    webAddress: String,
    storeName: String,
    storeCity: String,
    storeCityID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'city'
    },
    countries: [],
    dispatchDayMin: Number,
    dispatchDayMax: Number,
    customization: Boolean,
    giftWrap: Boolean,
    cod: Boolean,
    freeShiping: Boolean,
    returnandreplace: String,
    viewCount: Number,
    reviewCount: Number,
    bookmarkCount: Number,
    location: {
        type: [Number],  // [<longitude>, <latitude>]
        index: '2dsphere'      // create the geospatial index
    },
    avgRating: Number,
    isActive: { type: Boolean, default: false },
    dateCreated: { type: Date, default: Date.now },
    dateModified: { type: Date, default: Date.now },
});


StoreSchema.index({ storeDiscription: 'text', storeName: 'text' });

StoreSchema.pre('update', function (next, done) {
    this.dateModified = Date.now();
    next();
});
StoreSchema.pre('save', function (next, done) {
    this.dateModified = Date.now();
    next();
});
StoreSchema.methods.toJSON = function () {
    let obj = this.toObject();
    delete obj.__v;
    delete obj.dateModified;
    delete obj.dateCreated;
    return obj
};
module.exports.StoreModel = mongoose.model('Store', StoreSchema);