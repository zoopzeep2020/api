/**
 * Created by WebrexStudio on 5/8/17.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
let UserNotificationSchema = new Schema({
    userId:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: String,
    deviceToken: String,
    description: String,
    type: String,
    logo: String,
    isActive: { type: Boolean, default: false },
    expiryDate: { type: Date, default: Date.now },
    dateCreated: { type: Date, default: Date.now },
    dateModified: { type: Date, default: Date.now },
});
UserNotificationSchema.pre('update', function(next, done) {
    this.dateModified = Date.now();
    next();
});
UserNotificationSchema.pre('save', function(next, done) {
    this.dateModified = Date.now();
    next();
});
UserNotificationSchema.methods.toJSON = function() {
    let obj = this.toObject();
    delete obj.__v;
    delete obj.dateModified;
    delete obj.dateCreated;
    return obj
};
module.exports.UserNotificationModel = mongoose.model('UserNotification', UserNotificationSchema);