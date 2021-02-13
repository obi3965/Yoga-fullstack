const express = require('express');
const { signup, signin, signout } = require('../controllers/authController');
const {  isRequestValidated, validateSignUpRequest, validateSignInRequest } = require('../validation/validate');

const router = express.Router();

router.post('/signup', validateSignUpRequest, isRequestValidated, signup)
router.post('/signin', validateSignInRequest,isRequestValidated, signin)
router.get('/signout', signout)















module.exports = router