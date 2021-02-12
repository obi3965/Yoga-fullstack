const express = require('express');
const { requireSignin } = require('../middlewares/express-jwt');

const {create} = require('../controllers/categorycontroller')
const router = express.Router();

router.post('/category', create)
















module.exports = router