/**
 * Created by WebrexStudio on 5/8/17.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
let CitySchema = new Schema({
    cityName: String,
    cityState: String,
    location: {
        type: [Number],  // [<longitude>, <latitude>]
        index: '2dsphere'      // create the geospatial index
    },
    name: String,
    state: String,
    lon: Number,
    lat: Number,
    dateCreated: { type: Date, default: Date.now },
    dateModified: { type: Date, default: Date.now },
});

CitySchema.index({ "location": "2dsphere" });

CitySchema.pre('update', function (next, done) {
    this.dateModified = Date.now();
    next();
});
CitySchema.pre('save', function (next, done) {
    this.dateModified = Date.now();
    next();
});
CitySchema.methods.toJSON = function () {
    let obj = this.toObject();
    delete obj.__v;
    delete obj.dateModified;
    delete obj.dateCreated;
    return obj
};
module.exports.CityModel = mongoose.model('City', CitySchema);