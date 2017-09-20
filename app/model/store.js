/**
 * Created by crosp on 5/8/17.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
let StoreSchema = new Schema({
    storeId: Schema.Types.ObjectId,
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
        ref: 'Keyword'
    }],
    otherKeyword: [],
    storeCatalogs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Catalog'
    }],
    webAddress: String,
    countries: [],
    dispatchDayMin: Number,
    dispatchDayMax: Number,
    customization: Boolean,
    giftWrap: Boolean,
    cod: Boolean,
    freeShiping: Boolean,
    returnandreplace: String,
    isActive: { type: Boolean, default: false },
    dateCreated: { type: Date, default: Date.now },
    dateModified: { type: Date, default: Date.now },
});
StoreSchema.pre('update', function(next, done) {
    this.dateModified = Date.now();
    next();
});
StoreSchema.pre('save', function(next, done) {
    this.dateModified = Date.now();
    next();
});
StoreSchema.methods.toJSON = function() {
    let obj = this.toObject();
    delete obj.__v;
    delete obj.dateModified;
    delete obj.dateCreated;
    return obj
};
module.exports.StoreModel = mongoose.model('Store', StoreSchema);