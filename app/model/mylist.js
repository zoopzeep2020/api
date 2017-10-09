/**
 * Created by crosp on 5/8/17.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
let MylistSchema = new Schema({
    stores: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store'
    }],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    listName: String,
    dateCreated: { type: Date, default: Date.now },
    dateModified: { type: Date, default: Date.now }
});
MylistSchema.pre('update', function(next, done) {
    this.dateModified = Date.now();
    next();
});
MylistSchema.pre('save', function(next, done) {
    this.dateModified = Date.now();
    next();
});
MylistSchema.methods.toJSON = function() {
    let obj = this.toObject();
    delete obj.__v;
    delete obj.dateModified;
    delete obj.dateCreated;
    return obj
};
module.exports.MylistModel = mongoose.model('Mylist', MylistSchema);