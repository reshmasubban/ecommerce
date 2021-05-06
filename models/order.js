const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    description: {type:String,required: true},
    //address: {type:String,required: true},
    //price: {type:Number, required: true},
    count : {type:Number, required:true},
},
{timestamps: true}
);

module.exports = mongoose.model("Order", orderSchema);