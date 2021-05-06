const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description : { type: String, required: true },
    price : { type: Number, required: true },
    quantity : { type: Number, required: false },
    stock: {type:Number, required: true},
    item: {type:String,required:false},
    model: {type:String, required:false},
    color: {type:String, required:false},
    Storage: {type:String, required:false},
    size:{type:String, required:false},
    offer: {type:String, required:false},
});

module.exports = mongoose.model("Product", productSchema);