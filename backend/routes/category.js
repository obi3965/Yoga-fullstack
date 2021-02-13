const express = require('express');
const { requireSignin } = require('../middlewares/express-jwt');
const { isAuth } = require('../middlewares/userAuth');
const { isAdmin } = require('../middlewares/adminAuth');
const { userById } = require('../controllers/userController')
const {create, categories, singleCategory, categoryById, updateCategory} = require('../controllers/categorycontroller')


const router = express.Router();

router.get('/categories', categories)
router.get('/category/:categoryId', singleCategory)
router.post('/category/create/:userId', requireSignin, isAuth, isAdmin, create);
router.put('/category/:categoryId/:userId' ,requireSignin, isAuth, isAdmin, updateCategory )

router.param('categoryId', categoryById)
router.param('userId', userById);















module.exports = router