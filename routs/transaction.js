const express = require("express")
const router = express.Router();
const {isAdmin,userById} = require("../controllers/user")
const {create} = require("../controllers/transaction");

router.post("/transaction/create/:userId",isAdmin,create)

router.param('userId', userById);
 

module.exports = router