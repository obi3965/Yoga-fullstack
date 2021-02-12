const express = require('express');
const { requireSignin } = require('../middlewares/express-jwt');
const { isAuth } = require('../middlewares/userAuth');
const { isAdmin } = require('../middlewares/adminAuth');
const { userById } = require('../controllers/userController')
const {create} = require('../controllers/categorycontroller')


const router = express.Router();

router.post('/category/create/:userId', requireSignin, isAuth, isAdmin, create);
router.param('userId', userById);















module.exports = router