/**
 * Created by crosp on 5/8/17.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
let ReviewCommentSchema = new Schema({
    userId:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    storeId:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store'
    },
    reviewId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Review'
    },
    comment: String,
    dateCreated: { type: Date, default: Date.now },
    dateModified: { type: Date, default: Date.now },
    
    title: String,
    dateCreated: { type: Date, default: Date.now },
    dateModified: { type: Date, default: Date.now }
});
ReviewCommentSchema.pre('update', function(next, done) {
    this.dateModified = Date.now();
    next();
});
ReviewCommentSchema.pre('save', function(next, done) {
    this.dateModified = Date.now();
    next();
});
ReviewCommentSchema.methods.toJSON = function() {
    let obj = this.toObject();
    delete obj.__v;
    delete obj.dateModified;
    delete obj.dateCreated;
    return obj
};
module.exports.ReviewCommentModel = mongoose.model('ReviewComment', ReviewCommentSchema);