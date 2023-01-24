const express=require('express');
const { registerUser, authUser, updateUserProfile } = require('../controllers/registerUser');
const protect = require('../middleware/authMiddleware');

const router=express.Router();

router.route("/").post(registerUser);
router.post("/login",authUser);

router.route("/myprofile").post(protect,updateUserProfile);

module.exports=router;