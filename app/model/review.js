/**
 * Created by crosp on 5/8/17.
 */
const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
let ReviewSchema = new Schema({
    userId:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    storeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store'
    },
    ratingScale: Number,
    description: String,
    timeDifference: String,
    dateCreated: { type: Date, default: Date.now },
    dateModified: { type: Date, default: Date.now },
});
ReviewSchema.pre('update', function(next, done) {
    this.dateModified = Date.now();
    next();
});
ReviewSchema.pre('save', function(next, done) {
    this.dateModified = Date.now();
    next();
});
ReviewSchema.methods.toJSON = function() {
    let obj = this.toObject();
    delete obj.__v;
    delete obj.dateModified;
    return obj
};
module.exports.ReviewModel = mongoose.model('Review', ReviewSchema);