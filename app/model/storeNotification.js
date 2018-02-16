/**
 * Created by WebrexStudio on 5/8/17.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
let StoreNotificationSchema = new Schema({
    storeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Store'
    },
    title: String,
    deviceToken: String,
    description: String,
    logo: String,
    deviceType: String,
    NotificataionType: String,
    isActive: { type: Boolean, default: false },
    expiryDate: { type: Date, default: Date.now },
    dateCreated: { type: Date, default: Date.now },
    dateModified: { type: Date, default: Date.now },
});
StoreNotificationSchema.pre('update', function(next, done) {
    this.dateModified = Date.now();
    next();
});
StoreNotificationSchema.pre('save', function(next, done) {
    this.dateModified = Date.now();
    next();
});
StoreNotificationSchema.methods.toJSON = function() {
    let obj = this.toObject();
    delete obj.__v;
    delete obj.dateModified;
    delete obj.dateCreated;
    return obj
};
module.exports.StoreNotificationModel = mongoose.model('StoreNotification', StoreNotificationSchema);