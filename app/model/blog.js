/**
 * Created by WebrexStudio on 5/8/17.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
let BlogSchema = new Schema({    
    title: String,
    blogPicture:String,
    URL:String,
    description:String,
    authorImage:String,
    authorName:String,
    isLike:Boolean,
    isSave:Boolean,
    likeCount:Number,
    saveCount:Number,
    dateCreated: { type: Date, default: Date.now },
    dateModified: { type: Date, default: Date.now },
    likedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }],
    savedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }],
});
BlogSchema.pre('update', function(next, done) {
    this.dateModified = Date.now();
    next();
});
BlogSchema.pre('save', function(next, done) {
    this.dateModified = Date.now();
    next();
});
BlogSchema.methods.toJSON = function() {
    let obj = this.toObject();
    delete obj.__v;
    return obj
};
module.exports.BlogModel = mongoose.model('Blog', BlogSchema);