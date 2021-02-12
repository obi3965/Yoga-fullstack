const express = require('express');


const { userById, singleUser } = require('../controllers/userController');
const { requireSignin } = require('../middlewares/express-jwt');
const router = express.Router();


router.get("/user/:userId", requireSignin, singleUser);
router.param("userId", userById)





module.exports = router