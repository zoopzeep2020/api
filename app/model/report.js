/**
 * Created by crosp on 5/8/17.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
let ReportSchema = new Schema({
    userId:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    reviewId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'review'
    },
    description: String,
    dateCreated: { type: Date, default: Date.now },
    dateModified: { type: Date, default: Date.now },
});
ReportSchema.pre('update', function(next, done) {
    this.dateModified = Date.now();
    next();
});
ReportSchema.pre('save', function(next, done) {
    this.dateModified = Date.now();
    next();
});
ReportSchema.methods.toJSON = function() {
    let obj = this.toObject();
    delete obj.__v;
    delete obj.dateModified;
    delete obj.dateCreated;
    return obj
};
module.exports.ReportModel = mongoose.model('Report', ReportSchema);