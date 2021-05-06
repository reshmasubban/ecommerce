
const Order=require("../models/order")


exports.orderById= (req,res,next,id) => {
    Order.findById(id).exec((err,order) => {
        if(err || !order){
            return res.status(400).json({
                error : "User not found"
            });
        }
        req.order = order;
        next();
    });
}
exports.order = (req,res) => {
    return res.json(req.order)
}


exports.create = (req,res) => {
    const order = new Order(req.body);
    order.save((err,data)=>{
        if(err) {
            return res.status(400),json({error:err});
        } else {
            res.json({data})
        }
    })
}


exports.listOrders = (req,res) => {
    Order.find()
        .exec((err,order) => {
            if(err){
                return res.status(400).json({
                    error:errorHandler(err)
                })
            }
            res.json(order)
        })
}

exports.finding = (req,res) => {
    Order.find(
        { description: req.query.description}
    )
        .exec((err,data) =>{
            if(err){
                return res.status(400).json({
                    error:"No products found"
                })
            }
            res.json({data})
        })
}