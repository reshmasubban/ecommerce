const Product= require('../models/product');

exports.productById= (req,res,next,id) => {
    Product.findById(id).exec((err,product) => {
        if(err || !product){
            return res.status(400).json({
                error : "User not found"
            });
        }
        req.product = product;
        next();
    });
}

exports.product = (req,res) => {
    return res.json(req.product)
}

exports.create = (req,res) => {
    const product = new Product(req.body);
    product.save((err,data)=>{
        if(err) {
            return res.status(400),json({error:err});
        }
        res.json({data})
    })
}

exports.list = ((req,res) => {
    Product.find()
    .select(["name","stock","price"])
        .exec((err,data) =>{
            if(err){
                return res.status(400).json({
                    error:"No products found"
                })
            }
            res.json({data})
        })
})


exports.reduceQuantity = (req,res,next) => {
    Product.updateOne(
        { _id: req.product._id},
        {$inc: {stock: -req.body.count  }},
    )
    .exec((err,data) =>{
        if(err){
            return res.status(400).json({
                error:"No products found"
            })
        }
        next();
        res.json({data})
    })
    
}

exports.addQuantity = ((req,res) => {
    Product.updateOne(
        { _id: req.product._id},
        {$inc: {stock: req.body.count  }}
    )
    .exec((err,data) =>{
            if(err){
                return res.status(400).json({
                    error:"No products found"
                })
            }
            res.json({data})
        })
})

exports.update = ((req,res) => {
    Product.update(
        { _id: req.product._id },
        { $set: req.body }
    ).exec((err,data) =>{
        if(err){
            return res.status(400).json({
                error:"Product Not Found"
            })
        }
        res.json({
            message:"Product Updated Successfully"
        })
    })
})

exports.remove = ((req,res) => {
    let product = req.product
    product.remove((err,deletedProduct) =>{
        if(err)
        {
            return res.status(400).json({
                error:"Product not found"
            })
        }
        res.json({
            deletedProduct,
            message : "Product Deleated Successfully"
        })
    })
})

exports.finding = ((req,res) => {
    Product.find(
        { name: req.query.name}
    )
        .exec((err,data) =>{
            if(err){
                return res.status(400).json({
                    error:"No products found"
                })
            }
            res.json({data})
        })
})
