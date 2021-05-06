const express=require("express")
const {login,register, isSuperAdmin, superAdmin, userById, isAdmin, admin, profile,update,activate} = require("../controllers/user");
const router = express.Router();

router.post("/login",login)
// router.post("/register",function(req, res){
//     register})
router.post("/register",register)
router.post("/activate",activate)
router.get("/supeadmin/:userId",isSuperAdmin,superAdmin)
router.get("/admin/:userId",isAdmin,admin)
router.get("/profile/:userId",profile)
router.put("/user/:userId",update)

router.param('userId',userById);
module.exports=router