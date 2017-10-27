/**
 * Created by crosp on 5/8/17.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
let FeedbackSchema = new Schema({
    title: String,
    feedbackImage:String,
    description: String,
    dateCreated: { type: Date, default: Date.now },
    dateModified: { type: Date, default: Date.now },
});
FeedbackSchema.pre('update', function(next, done) {
    this.dateModified = Date.now();
    next();
});
FeedbackSchema.pre('save', function(next, done) {
    this.dateModified = Date.now();
    next();
});
FeedbackSchema.methods.toJSON = function() {
    let obj = this.toObject();
    delete obj.__v;
    delete obj.dateModified;
    delete obj.dateCreated;
    return obj
};
module.exports.FeedbackModel = mongoose.model('Feedback', FeedbackSchema);