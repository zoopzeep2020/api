/**
 * Created by WebrexStudio on 5/8/17.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
let IndianCitySchema = new Schema({
    name: String,
    state: String,
    lon: Number,
    lat: Number,
    dateCreated: { type: Date, default: Date.now },
    dateModified: { type: Date, default: Date.now },
});
IndianCitySchema.pre('update', function(next, done) {
    this.dateModified = Date.now();
    next();
});
IndianCitySchema.pre('save', function(next, done) {
    this.dateModified = Date.now();
    next();
});
IndianCitySchema.methods.toJSON = function() {
    let obj = this.toObject();
    delete obj.__v;
    delete obj.dateModified;
    delete obj.dateCreated;
    return obj
};
module.exports.IndianCityModel = mongoose.model('IndianCity', IndianCitySchema);