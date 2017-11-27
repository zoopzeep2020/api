
/**
 * Created by WebrexStudio on 5/8/17.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
let AdminSchema = new Schema({
    adminKey: { type: String, default: "zeepzoopadminkey" },
});
AdminSchema.methods.toJSON = function() {
    let obj = this.toObject();
    delete obj.__v;
    delete obj.dateModified;
    delete obj.dateCreated;
    return obj
};
module.exports.AdminModel = mongoose.model('Admin', AdminSchema);