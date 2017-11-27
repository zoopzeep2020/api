/**
 * Created by WebrexStudio on 5/8/17.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
let BookmarkSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    storeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store'
    },
    
    dateCreated: { type: Date, default: Date.now },
    dateModified: { type: Date, default: Date.now }
});
BookmarkSchema.pre('update', function(next, done) {
    this.dateModified = Date.now();
    next();
});
BookmarkSchema.pre('save', function(next, done) {
    this.dateModified = Date.now();
    next();
});
BookmarkSchema.methods.toJSON = function() {
    let obj = this.toObject();
    delete obj.__v;
    delete obj.dateModified;
    delete obj.dateCreated;
    return obj
};
module.exports.BookmarkModel = mongoose.model('Bookmark', BookmarkSchema);