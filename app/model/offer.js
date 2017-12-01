/**
 * Created by WebrexStudio on 5/8/17.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
let OfferSchema = new Schema({
    storeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store'
    },
    savedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }],
    offerCode: String,
    offerName: String,
    offerDescription: String,
    aplicableForAll:{ type: Boolean },
    isSave:{ type: Boolean },
    orderAbovePrice:Number,
    discountTypePercentage:{ type: Boolean },
    discountTypeFlat:{ type: Boolean },
    offerOnline:{ type: Boolean },
    offerOffline:{ type: Boolean },
    percentageDiscount:Number,
    flatDiscount:Number,
    startDate:{ type: Date },
    endDate:{ type: Date },
    offerPicture:String, 
    cityName:[],  
    claimedOfferBy: [{
        type: mongoose.Schema.Types.ObjectId,
    }], 
    dateCreated: { type: Date, default: Date.now },
    dateModified: { type: Date, default: Date.now },
});
OfferSchema.pre('update', function(next, done) {
    this.dateModified = Date.now();
    next();
});
OfferSchema.pre('save', function(next, done) {
    this.dateModified = Date.now();
    next();
});
OfferSchema.methods.toJSON = function() {
    let obj = this.toObject();
    delete obj.__v;
    delete obj.dateModified;
    delete obj.dateCreated;
    return obj
};
module.exports.OfferModel = mongoose.model('Offer', OfferSchema);