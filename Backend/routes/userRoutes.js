const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const { body } = require('express-validator');//for validating every data entered in body we use express-validator.


router.post('/register',[
    body('email').isEmail().withMessage("Invalid Email"),//it checks if the incoming email from body is validEmail , if not valid then write a message.
    //similarly for name but name is in the form of object so we have to seperate it
    body('fullname.firstname').isLength({min : 3}).withMessage('First name must be 3 character long'),
    body('password').isLength({min : 6}).withMessage('Password must be 6 character long'),
],userController.registerController)


module.exports = router;