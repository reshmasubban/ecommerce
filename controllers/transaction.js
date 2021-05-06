const Transaction=require("../models/transaction")


exports.create = ((req,res) => {
    const transaction = new Transaction(req.body);
    transaction.save((err,data)=>{
        if(err) {
            return res.status(400),json({error:err});
        }
        res.json({data})
    })
})