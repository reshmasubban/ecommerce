const express=require("express")
const {userById } = require("../controllers/user");
const {productById,reduceQuantity,addQuantity,order} = require("../controllers/product")
const {create,listOrders,finding,orderById} = require("../controllers/order");

const router = express.Router();

router.put("/order/add/:productId/:userId",addQuantity)
router.post("/order/create/:userId/:productId",reduceQuantity,create)
router.get("/order/listorders",listOrders)
router.get("/order/:orderId",order)
router.get("/order/finding",finding)

router.param('userId',userById);
router.param('productId',productById)
router.param('orderId',orderById)


module.exports=router

